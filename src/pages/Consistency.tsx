import React, { useState } from 'react';
import { Target, BarChart3, TrendingUp, Award, Lock } from 'lucide-react';
import { mockPlayers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export const Consistency: React.FC = () => {
  const { user } = useAuth();
  const [position, setPosition] = useState<string>('all');
  const [minGames, setMinGames] = useState(20);

  const filteredPlayers = mockPlayers.filter(player => {
    const positionMatch = position === 'all' || player.position === position;
    const gamesMatch = player.stats.gamesPlayed >= minGames;
    return positionMatch && gamesMatch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => b.consistency - a.consistency);

  const getConsistencyLevel = (score: number) => {
    if (score >= 90) return { level: 'Elite', color: 'text-purple-600 bg-purple-50', description: 'Rock solid every game' };
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600 bg-green-50', description: 'Very reliable performer' };
    if (score >= 70) return { level: 'Good', color: 'text-blue-600 bg-blue-50', description: 'Generally dependable' };
    if (score >= 60) return { level: 'Average', color: 'text-yellow-600 bg-yellow-50', description: 'Some ups and downs' };
    return { level: 'Volatile', color: 'text-red-600 bg-red-50', description: 'Unpredictable performance' };
  };

  const getConsistencyIcon = (score: number) => {
    if (score >= 90) return '💎';
    if (score >= 80) return '🎯';
    if (score >= 70) return '✅';
    if (score >= 60) return '⚡';
    return '📈';
  };

  const calculateVariance = (player: any) => {
    // Simulate game-by-game variance for demonstration
    const baseVariance = 100 - player.consistency;
    return baseVariance.toFixed(1);
  };

  const canAccessAdvancedMetrics = user && (user.tier === 'premium' || user.tier === 'pro');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Target className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Consistency Scores</h1>
        </div>
        <p className="text-gray-600">Players ranked by reliability and performance consistency</p>
        
        {!canAccessAdvancedMetrics && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Enhanced Metrics Available</span>
            </div>
            <p className="text-purple-700 text-sm mt-1">
              Upgrade to Premium for detailed variance analysis, game-by-game breakdowns, and advanced consistency metrics
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10+ Games</option>
                <option value={20}>20+ Games</option>
                <option value={30}>30+ Games</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            Showing {sortedPlayers.length} players
          </div>
        </div>
      </div>

      {/* Consistency Rankings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span>Consistency Rankings</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Based on game-to-game performance variance and reliability metrics
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {sortedPlayers.map((player, index) => {
            const consistencyLevel = getConsistencyLevel(player.consistency);
            const variance = calculateVariance(player);
            
            return (
              <div key={player.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      index === 0 ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white' :
                      index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' :
                      index === 2 ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
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
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${consistencyLevel.color}`}>
                            {getConsistencyIcon(player.consistency)} {consistencyLevel.level}
                          </span>
                        </div>
                        <p className="text-gray-600">{player.team} - {player.position}</p>
                        <p className="text-sm text-gray-500 mt-1">{consistencyLevel.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {player.consistency}
                        </div>
                        <div className="text-xs text-gray-500">Consistency Score</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Avg Fantasy Points</div>
                        <div className="text-lg font-bold text-purple-600">
                          {player.stats.fantasyPoints.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Per game
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Games Played</div>
                        <div className="text-lg font-bold text-green-600">
                          {player.stats.gamesPlayed}
                        </div>
                        <div className="text-xs text-gray-500">
                          This season
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Efficiency</div>
                        <div className="text-lg font-bold text-blue-600">
                          {player.efficiency}
                        </div>
                        <div className="text-xs text-gray-500">
                          Rating
                        </div>
                      </div>

                      {canAccessAdvancedMetrics ? (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-sm text-gray-600 mb-1">Variance</div>
                          <div className="text-lg font-bold text-orange-600">
                            {variance}%
                          </div>
                          <div className="text-xs text-gray-500">
                            Game-to-game
                          </div>
                        </div>
                      ) : (
                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                          <div className="text-sm text-purple-600 mb-1 flex items-center">
                            <Lock className="h-3 w-3 mr-1" />
                            Variance
                          </div>
                          <div className="text-lg font-bold text-purple-600">
                            Premium
                          </div>
                          <div className="text-xs text-purple-500">
                            Upgrade to view
                          </div>
                        </div>
                      )}
                    </div>

                    {canAccessAdvancedMetrics && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-blue-800 mb-2">Advanced Consistency Metrics</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-blue-600">Floor:</span>
                            <span className="ml-2 font-medium">{(player.stats.fantasyPoints * 0.7).toFixed(1)} FP</span>
                          </div>
                          <div>
                            <span className="text-blue-600">Ceiling:</span>
                            <span className="ml-2 font-medium">{(player.stats.fantasyPoints * 1.4).toFixed(1)} FP</span>
                          </div>
                          <div>
                            <span className="text-blue-600">Boom Rate:</span>
                            <span className="ml-2 font-medium">{Math.round(player.consistency * 0.3)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
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
            <div className="bg-purple-100 p-2 rounded-full">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Most Consistent</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers[0]?.name}
          </div>
          <div className="text-purple-600 font-medium">
            {sortedPlayers[0]?.consistency}/100 consistency score
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Reliable Players</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers.filter(p => p.consistency >= 80).length}
          </div>
          <div className="text-green-600 font-medium">80+ consistency score</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">League Average</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {Math.round(sortedPlayers.reduce((sum, p) => sum + p.consistency, 0) / sortedPlayers.length)}
          </div>
          <div className="text-blue-600 font-medium">Consistency score</div>
        </div>
      </div>
    </div>
  );
};