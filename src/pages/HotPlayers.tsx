import React, { useState } from 'react';
import { Flame, TrendingUp, Calendar, Filter, Crown } from 'lucide-react';
import { mockPlayers } from '../data/mockData';

export const HotPlayers: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');
  const [position, setPosition] = useState<string>('all');
  const [minGames, setMinGames] = useState(2);

  const filteredPlayers = mockPlayers.filter(player => {
    const positionMatch = position === 'all' || player.position === position;
    const gamesMatch = timeframe === 'week' 
      ? player.lastWeek.gamesPlayed >= minGames
      : player.lastMonth.gamesPlayed >= minGames;
    return positionMatch && gamesMatch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (timeframe === 'week') {
      return b.weeklyTrend - a.weeklyTrend;
    }
    return b.monthlyTrend - a.monthlyTrend;
  });

  const getHotLevel = (trend: number) => {
    if (trend >= 20) return { level: 'blazing', color: 'text-red-600 bg-red-50', icon: '🔥🔥🔥' };
    if (trend >= 10) return { level: 'hot', color: 'text-orange-600 bg-orange-50', icon: '🔥🔥' };
    if (trend >= 5) return { level: 'warm', color: 'text-yellow-600 bg-yellow-50', icon: '🔥' };
    if (trend >= 0) return { level: 'steady', color: 'text-gray-600 bg-gray-50', icon: '➡️' };
    return { level: 'cold', color: 'text-blue-600 bg-blue-50', icon: '❄️' };
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Flame className="h-8 w-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Hot Players</h1>
        </div>
        <p className="text-gray-600">Players trending up based on recent performance vs season averages</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeframe</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeframe('week')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === 'week'
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Last Week
                </button>
                <button
                  onClick={() => setTimeframe('month')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timeframe === 'month'
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Last Month
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Positions</option>
                <option value="G">Guards</option>
                <option value="F">Forwards</option>
                <option value="C">Centers</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Games</label>
              <select
                value={minGames}
                onChange={(e) => setMinGames(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={1}>1+ Games</option>
                <option value={2}>2+ Games</option>
                <option value={3}>3+ Games</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Showing {sortedPlayers.length} players
          </div>
        </div>
      </div>

      {/* Hot Players List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <Flame className="h-6 w-6 text-orange-600" />
            <span>Trending Players - {timeframe === 'week' ? 'Last Week' : 'Last Month'}</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Ranked by fantasy point improvement vs season average
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {sortedPlayers.map((player, index) => {
            const trend = timeframe === 'week' ? player.weeklyTrend : player.monthlyTrend;
            const recentStats = timeframe === 'week' ? player.lastWeek : player.lastMonth;
            const hotLevel = getHotLevel(trend);
            
            return (
              <div key={player.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white' :
                      index === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                      index === 2 ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-white' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${hotLevel.color}`}>
                            {hotLevel.icon} {hotLevel.level}
                          </span>
                        </div>
                        <p className="text-gray-600">{player.team} - {player.position}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          {getTrendIcon(trend)}
                          <span className={`text-2xl font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">vs season avg</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Fantasy Points</div>
                        <div className="text-lg font-bold text-purple-600">
                          {recentStats.fantasyPoints.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Season: {player.stats.fantasyPoints.toFixed(1)}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Points</div>
                        <div className="text-lg font-bold text-blue-600">
                          {recentStats.points.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Season: {player.stats.points.toFixed(1)}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Rebounds</div>
                        <div className="text-lg font-bold text-green-600">
                          {recentStats.rebounds.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Season: {player.stats.rebounds.toFixed(1)}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Assists</div>
                        <div className="text-lg font-bold text-orange-600">
                          {recentStats.assists.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Season: {player.stats.assists.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Games: {recentStats.gamesPlayed}</span>
                        <span>Hot Score: {player.hotScore}/100</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {timeframe === 'week' ? 'Last 7 days' : 'Last 30 days'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <Flame className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hottest Player</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers[0]?.name}
          </div>
          <div className="text-green-600 font-medium">
            +{timeframe === 'week' ? sortedPlayers[0]?.weeklyTrend.toFixed(1) : sortedPlayers[0]?.monthlyTrend.toFixed(1)}% improvement
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Trending Up</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers.filter(p => (timeframe === 'week' ? p.weeklyTrend : p.monthlyTrend) > 5).length}
          </div>
          <div className="text-orange-600 font-medium">Players improving 5%+</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Crown className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Breakout Candidates</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers.filter(p => (timeframe === 'week' ? p.weeklyTrend : p.monthlyTrend) > 15).length}
          </div>
          <div className="text-yellow-600 font-medium">Players improving 15%+</div>
        </div>
      </div>
    </div>
  );
};