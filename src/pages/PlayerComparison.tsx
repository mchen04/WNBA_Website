import React, { useState } from 'react';
import { Search, ArrowRight, TrendingUp, TrendingDown, Lock } from 'lucide-react';
import { mockPlayers, Player } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export const PlayerComparison: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlayer1, setSelectedPlayer1] = useState<Player | null>(mockPlayers[0]);
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player | null>(mockPlayers[1]);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  const filteredPlayers1 = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredPlayers2 = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const getStatComparison = (stat1: number, stat2: number) => {
    if (stat1 > stat2) return { player1: 'better', player2: 'worse' };
    if (stat2 > stat1) return { player1: 'worse', player2: 'better' };
    return { player1: 'equal', player2: 'equal' };
  };

  const getStatColor = (comparison: string) => {
    switch (comparison) {
      case 'better': return 'text-green-600 bg-green-50';
      case 'worse': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const StatRow = ({ label, stat1, stat2, format = (n: number) => n.toString() }: {
    label: string;
    stat1: number;
    stat2: number;
    format?: (n: number) => string;
  }) => {
    const comparison = getStatComparison(stat1, stat2);
    
    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
        <div className={`text-center py-2 px-3 rounded-lg ${getStatColor(comparison.player1)}`}>
          <span className="font-semibold">{format(stat1)}</span>
        </div>
        <div className="text-center text-sm font-medium text-gray-600 flex items-center justify-center">
          {label}
        </div>
        <div className={`text-center py-2 px-3 rounded-lg ${getStatColor(comparison.player2)}`}>
          <span className="font-semibold">{format(stat2)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Comparison</h1>
        <p className="text-gray-600">Compare players side-by-side to make informed decisions</p>
      </div>

      {/* Player Selection */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Player 1 Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Player 1</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm1}
              onChange={(e) => setSearchTerm1(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {searchTerm1 && (
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg mb-4">
              {filteredPlayers1.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayer1(player);
                    setSearchTerm1('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.team} - {player.position}</div>
                </button>
              ))}
            </div>
          )}

          {selectedPlayer1 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{selectedPlayer1.name}</h4>
                <span className="text-sm text-gray-500">{selectedPlayer1.team}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{selectedPlayer1.position}</div>
              <div className="text-lg font-bold text-purple-600">
                {selectedPlayer1.stats.fantasyPoints} FP/G
              </div>
            </div>
          )}
        </div>

        {/* Player 2 Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Player 2</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm2}
              onChange={(e) => setSearchTerm2(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          {searchTerm2 && (
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg mb-4">
              {filteredPlayers2.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayer2(player);
                    setSearchTerm2('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium">{player.name}</div>
                  <div className="text-sm text-gray-500">{player.team} - {player.position}</div>
                </button>
              ))}
            </div>
          )}

          {selectedPlayer2 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg">{selectedPlayer2.name}</h4>
                <span className="text-sm text-gray-500">{selectedPlayer2.team}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{selectedPlayer2.position}</div>
              <div className="text-lg font-bold text-purple-600">
                {selectedPlayer2.stats.fantasyPoints} FP/G
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Results */}
      {selectedPlayer1 && selectedPlayer2 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{selectedPlayer1.name}</h3>
                <p className="text-gray-600">{selectedPlayer1.team} - {selectedPlayer1.position}</p>
              </div>
              <div className="text-center flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900">{selectedPlayer2.name}</h3>
                <p className="text-gray-600">{selectedPlayer2.team} - {selectedPlayer2.position}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Season Averages</h4>
            <div className="space-y-2">
              <StatRow 
                label="Fantasy Points" 
                stat1={selectedPlayer1.stats.fantasyPoints} 
                stat2={selectedPlayer2.stats.fantasyPoints}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Points" 
                stat1={selectedPlayer1.stats.points} 
                stat2={selectedPlayer2.stats.points}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Rebounds" 
                stat1={selectedPlayer1.stats.rebounds} 
                stat2={selectedPlayer2.stats.rebounds}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Assists" 
                stat1={selectedPlayer1.stats.assists} 
                stat2={selectedPlayer2.stats.assists}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Steals" 
                stat1={selectedPlayer1.stats.steals} 
                stat2={selectedPlayer2.stats.steals}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Blocks" 
                stat1={selectedPlayer1.stats.blocks} 
                stat2={selectedPlayer2.stats.blocks}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="3-Pointers" 
                stat1={selectedPlayer1.stats.threePointers} 
                stat2={selectedPlayer2.stats.threePointers}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="FG%" 
                stat1={selectedPlayer1.stats.fieldGoalPercentage} 
                stat2={selectedPlayer2.stats.fieldGoalPercentage}
                format={(n) => `${n.toFixed(1)}%`}
              />
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-8">Last 5 Games</h4>
            <div className="space-y-2">
              <StatRow 
                label="Fantasy Points" 
                stat1={selectedPlayer1.last5Games.fantasyPoints} 
                stat2={selectedPlayer2.last5Games.fantasyPoints}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Points" 
                stat1={selectedPlayer1.last5Games.points} 
                stat2={selectedPlayer2.last5Games.points}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Rebounds" 
                stat1={selectedPlayer1.last5Games.rebounds} 
                stat2={selectedPlayer2.last5Games.rebounds}
                format={(n) => n.toFixed(1)}
              />
              <StatRow 
                label="Assists" 
                stat1={selectedPlayer1.last5Games.assists} 
                stat2={selectedPlayer2.last5Games.assists}
                format={(n) => n.toFixed(1)}
              />
            </div>

            {(!user || user.tier === 'free') && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-3">
                  <Lock className="h-6 w-6 text-purple-600" />
                  <div>
                    <h4 className="font-semibold text-purple-900">Unlock Advanced Metrics</h4>
                    <p className="text-purple-700 text-sm">
                      Get efficiency ratings, consistency scores, and unlimited comparisons with Premium
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};