-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (simplified for Google OAuth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscription tiers enum
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'pro');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier subscription_tier DEFAULT 'free',
    status subscription_status DEFAULT 'active',
    expires_at TIMESTAMPTZ,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User leagues configuration
CREATE TABLE user_leagues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    scoring_settings JSONB NOT NULL DEFAULT '{
        "points": 1,
        "rebounds": 1,
        "assists": 1,
        "steals": 2,
        "blocks": 2,
        "three_made": 1,
        "fg_attempted": 0,
        "turnovers": -1,
        "ft_made": 1,
        "ft_attempted": 0
    }',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    espn_id INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    abbreviation TEXT NOT NULL,
    logo_url TEXT,
    conference TEXT
);

-- Players table
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    espn_id INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    position TEXT,
    team_id UUID REFERENCES teams(id),
    jersey_number INTEGER,
    status TEXT,
    photo_url TEXT
);

-- Games table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    espn_id INTEGER UNIQUE NOT NULL,
    home_team_id UUID REFERENCES teams(id),
    away_team_id UUID REFERENCES teams(id),
    game_date TIMESTAMPTZ NOT NULL,
    season INTEGER NOT NULL,
    status TEXT
);

-- Player game statistics
CREATE TABLE player_game_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id),
    game_id UUID NOT NULL REFERENCES games(id),
    minutes INTEGER,
    points INTEGER,
    rebounds INTEGER,
    assists INTEGER,
    steals INTEGER,
    blocks INTEGER,
    turnovers INTEGER,
    fg_made INTEGER,
    fg_attempted INTEGER,
    three_made INTEGER,
    three_attempted INTEGER,
    ft_made INTEGER,
    ft_attempted INTEGER,
    plus_minus INTEGER,
    fouls INTEGER,
    UNIQUE(player_id, game_id)
);

-- Player analytics (pre-calculated)
CREATE TABLE player_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id),
    season INTEGER NOT NULL,
    consistency_score DECIMAL(5,2),
    trade_value DECIMAL(5,2),
    fantasy_avg_last_5 DECIMAL(5,2),
    fantasy_avg_season DECIMAL(5,2),
    hot_streak_score DECIMAL(5,2),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id, season)
);

-- Waiver recommendation types
CREATE TYPE recommendation_type AS ENUM ('weekly', 'daily');

-- Waiver recommendations (Pro tier)
CREATE TABLE waiver_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    player_id UUID NOT NULL REFERENCES players(id),
    recommendation_type recommendation_type NOT NULL,
    priority_score DECIMAL(5,2) NOT NULL,
    projected_points DECIMAL(5,2),
    games_this_period INTEGER
);

-- Injuries table
CREATE TABLE injuries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_id UUID NOT NULL REFERENCES players(id),
    status TEXT,
    description TEXT,
    return_date DATE,
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(player_id)
);

-- API cache table
CREATE TABLE api_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    endpoint TEXT NOT NULL,
    response_data JSONB NOT NULL,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_user_leagues_user_id ON user_leagues(user_id);
CREATE INDEX idx_players_team_id ON players(team_id);
CREATE INDEX idx_games_date ON games(game_date);
CREATE INDEX idx_games_season ON games(season);
CREATE INDEX idx_player_game_stats_player_id ON player_game_stats(player_id);
CREATE INDEX idx_player_game_stats_game_id ON player_game_stats(game_id);
CREATE INDEX idx_player_analytics_player_id ON player_analytics(player_id);
CREATE INDEX idx_player_analytics_season ON player_analytics(season);
CREATE INDEX idx_waiver_recommendations_date ON waiver_recommendations(date);
CREATE INDEX idx_injuries_player_id ON injuries(player_id);
CREATE INDEX idx_api_cache_endpoint ON api_cache(endpoint);
CREATE INDEX idx_api_cache_expires_at ON api_cache(expires_at);

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_leagues ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own leagues" ON user_leagues
    FOR ALL USING (auth.uid() = user_id);

-- Public read access for game data
CREATE POLICY "Anyone can view teams" ON teams
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view players" ON players
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view games" ON games
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view stats" ON player_game_stats
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view analytics" ON player_analytics
    FOR SELECT USING (true);

CREATE POLICY "Anyone can view injuries" ON injuries
    FOR SELECT USING (true);

-- Pro users can view waiver recommendations
CREATE POLICY "Pro users can view waiver recommendations" ON waiver_recommendations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM subscriptions 
            WHERE user_id = auth.uid() 
            AND tier = 'pro' 
            AND status = 'active'
        )
    );

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_player_analytics_updated_at BEFORE UPDATE ON player_analytics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();