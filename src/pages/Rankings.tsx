import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { mockPlayers } from '../data/mockData';

export const Rankings: React.FC = () => {
  const [sortBy, setSortBy] = useState<'fantasyPoints' | 'points' | 'rebounds' | 'assists'>('fantasyPoints');
  const [position, setPosition] = useState<string>('all');

  const filteredPlayers = position === 'all' 
    ? mockPlayers 
    : mockPlayers.filter(player => player.position === position);

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortBy === 'fantasyPoints') {
      return b.stats.fantasyPoints - a.stats.fantasyPoints;
    }
    return b.stats[sortBy] - a.stats[sortBy];
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-amber-600" />;
    return <span className="text-gray-500 font-semibold text-sm">{rank}</span>;
  };

  const getInjuryStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'questionable': return 'text-yellow-600 bg-yellow-50';
      case 'day-to-day': return 'text-orange-600 bg-orange-50';
      case 'out': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIndicator = (player: any) => {
    const seasonAvg = player.stats.fantasyPoints;
    const recentAvg = player.last5Games.fantasyPoints;
    const diff = ((recentAvg - seasonAvg) / seasonAvg) * 100;

    if (diff > 5) {
      return { icon: <TrendingUp className="h-4 w-4 text-green-500" />, text: 'Hot', color: 'text-green-600' };
    } else if (diff < -5) {
      return { icon: <TrendingDown className="h-4 w-4 text-red-500" />, text: 'Cold', color: 'text-red-600' };
    }
    return { icon: <Activity className="h-4 w-4 text-gray-400" />, text: 'Steady', color: 'text-gray-600' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Rankings</h1>
        <p className="text-gray-600">Top WNBA fantasy performers ranked by key metrics</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="fantasyPoints">Fantasy Points</option>
                <option value="points">Points</option>
                <option value="rebounds">Rebounds</option>
                <option value="assists">Assists</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Positions</option>
                <option value="G">Guards</option>
                <option value="F">Forwards</option>
                <option value="C">Centers</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fantasy Points
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rebounds
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assists
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const trend = getTrendIndicator(player);
                
                return (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center w-8">
                        {getRankIcon(rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.team} - {player.position}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-purple-600">
                        {player.stats.fantasyPoints}
                      </div>
                      <div className="text-xs text-gray-500">
                        L5: {player.last5Games.fantasyPoints}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.stats.points}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.stats.rebounds}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {player.stats.assists}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-1 ${trend.color}`}>
                        {trend.icon}
                        <span className="text-xs font-medium">{trend.text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInjuryStatusColor(player.injuryStatus)}`}>
                        {player.injuryStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Top Scorer</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {sortedPlayers[0]?.name}
          </div>
          <div className="text-purple-600 font-medium">
            {sortedPlayers[0]?.stats.fantasyPoints} Fantasy Points/Game
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Trending Up</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {mockPlayers.filter(p => getTrendIndicator(p).text === 'Hot').length}
          </div>
          <div className="text-green-600 font-medium">Players on fire</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-100 p-2 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Injury Concerns</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {mockPlayers.filter(p => p.injuryStatus !== 'healthy').length}
          </div>
          <div className="text-red-600 font-medium">Players to monitor</div>
        </div>
      </div>
    </div>
  );
};