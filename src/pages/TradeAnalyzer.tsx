import React, { useState } from 'react';
import { Search, Plus, X, TrendingUp, TrendingDown, Lock, AlertCircle } from 'lucide-react';
import { mockPlayers, Player } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface TradePlayer {
  player: Player;
  side: 'give' | 'receive';
}

export const TradeAnalyzer: React.FC = () => {
  const { user } = useAuth();
  const [tradePlayers, setTradePlayers] = useState<TradePlayer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSide, setSelectedSide] = useState<'give' | 'receive'>('give');
  const [tradeAnalysis, setTradeAnalysis] = useState<any>(null);

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !tradePlayers.some(tp => tp.player.id === player.id)
  );

  const givePlayers = tradePlayers.filter(tp => tp.side === 'give');
  const receivePlayers = tradePlayers.filter(tp => tp.side === 'receive');

  const addPlayer = (player: Player, side: 'give' | 'receive') => {
    setTradePlayers([...tradePlayers, { player, side }]);
    setSearchTerm('');
  };

  const removePlayer = (playerId: string) => {
    setTradePlayers(tradePlayers.filter(tp => tp.player.id !== playerId));
    setTradeAnalysis(null);
  };

  const analyzeTrade = () => {
    if (!user || user.tier === 'free') {
      return;
    }

    const giveValue = givePlayers.reduce((sum, tp) => sum + tp.player.tradeValue, 0);
    const receiveValue = receivePlayers.reduce((sum, tp) => sum + tp.player.tradeValue, 0);
    const fairnessScore = Math.round((Math.min(giveValue, receiveValue) / Math.max(giveValue, receiveValue)) * 100);
    
    let recommendation = 'neutral';
    let reasoning = '';
    
    if (fairnessScore >= 85) {
      recommendation = 'accept';
      reasoning = 'Fair trade with balanced value exchange';
    } else if (receiveValue > giveValue * 1.15) {
      recommendation = 'accept';
      reasoning = 'Great value - you\'re receiving more than you\'re giving up';
    } else if (giveValue > receiveValue * 1.15) {
      recommendation = 'decline';
      reasoning = 'Poor value - you\'re giving up too much';
    } else {
      recommendation = 'neutral';
      reasoning = 'Moderate trade - consider team needs and matchups';
    }

    setTradeAnalysis({
      fairnessScore,
      giveValue,
      receiveValue,
      recommendation,
      reasoning,
      giveFantasyPoints: givePlayers.reduce((sum, tp) => sum + tp.player.stats.fantasyPoints, 0),
      receiveFantasyPoints: receivePlayers.reduce((sum, tp) => sum + tp.player.stats.fantasyPoints, 0),
    });
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'accept': return 'text-green-700 bg-green-50 border-green-200';
      case 'decline': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'accept': return <TrendingUp className="h-5 w-5" />;
      case 'decline': return <TrendingDown className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const canUsePremiumFeatures = user && (user.tier === 'premium' || user.tier === 'pro');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Analyzer</h1>
        <p className="text-gray-600">Analyze trades with our fairness scoring system</p>
        {!canUsePremiumFeatures && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-purple-600" />
              <span className="text-purple-800 font-medium">Premium Feature</span>
            </div>
            <p className="text-purple-700 text-sm mt-1">
              Upgrade to Premium or Pro to unlock detailed trade analysis with fairness scoring
            </p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Player Search & Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Players</h3>
            
            <div className="mb-4">
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setSelectedSide('give')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedSide === 'give'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  You Give
                </button>
                <button
                  onClick={() => setSelectedSide('receive')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedSide === 'receive'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  You Receive
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {searchTerm && (
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredPlayers.map((player) => (
                  <button
                    key={player.id}
                    onClick={() => addPlayer(player, selectedSide)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-500">{player.team} - {player.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{player.stats.fantasyPoints} FP</div>
                        {canUsePremiumFeatures && (
                          <div className="text-xs text-gray-500">Value: {player.tradeValue}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trade Details */}
        <div className="lg:col-span-2">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* You Give */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                <TrendingDown className="h-5 w-5 mr-2" />
                You Give
              </h3>
              
              {givePlayers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No players selected</p>
              ) : (
                <div className="space-y-3">
                  {givePlayers.map((tp) => (
                    <div key={tp.player.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <div className="font-medium">{tp.player.name}</div>
                        <div className="text-sm text-gray-600">{tp.player.team} - {tp.player.position}</div>
                        <div className="text-sm text-red-600">{tp.player.stats.fantasyPoints} FP/G</div>
                      </div>
                      <button
                        onClick={() => removePlayer(tp.player.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* You Receive */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                You Receive
              </h3>
              
              {receivePlayers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No players selected</p>
              ) : (
                <div className="space-y-3">
                  {receivePlayers.map((tp) => (
                    <div key={tp.player.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">{tp.player.name}</div>
                        <div className="text-sm text-gray-600">{tp.player.team} - {tp.player.position}</div>
                        <div className="text-sm text-green-600">{tp.player.stats.fantasyPoints} FP/G</div>
                      </div>
                      <button
                        onClick={() => removePlayer(tp.player.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Analyze Button */}
          {givePlayers.length > 0 && receivePlayers.length > 0 && (
            <div className="text-center mb-6">
              <button
                onClick={analyzeTrade}
                disabled={!canUsePremiumFeatures}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  canUsePremiumFeatures
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canUsePremiumFeatures ? 'Analyze Trade' : 'Premium Required'}
              </button>
            </div>
          )}

          {/* Trade Analysis Results */}
          {tradeAnalysis && canUsePremiumFeatures && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Trade Analysis</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {tradeAnalysis.fairnessScore}
                  </div>
                  <div className="text-sm text-gray-600">Fairness Score</div>
                  <div className="text-xs text-gray-500 mt-1">out of 100</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600 mb-2">
                    {tradeAnalysis.giveFantasyPoints.toFixed(1)} FP/G
                  </div>
                  <div className="text-sm text-gray-600">You Give</div>
                  <div className="text-xs text-gray-500 mt-1">Total Fantasy Points</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 mb-2">
                    {tradeAnalysis.receiveFantasyPoints.toFixed(1)} FP/G
                  </div>
                  <div className="text-sm text-gray-600">You Receive</div>
                  <div className="text-xs text-gray-500 mt-1">Total Fantasy Points</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${getRecommendationColor(tradeAnalysis.recommendation)}`}>
                <div className="flex items-center space-x-3 mb-2">
                  {getRecommendationIcon(tradeAnalysis.recommendation)}
                  <span className="font-semibold capitalize">
                    {tradeAnalysis.recommendation === 'accept' ? 'Accept Trade' : 
                     tradeAnalysis.recommendation === 'decline' ? 'Decline Trade' : 'Consider Carefully'}
                  </span>
                </div>
                <p className="text-sm">{tradeAnalysis.reasoning}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Give Value:</span>
                  <span className="ml-2 font-medium">{tradeAnalysis.giveValue}</span>
                </div>
                <div>
                  <span className="text-gray-600">Receive Value:</span>
                  <span className="ml-2 font-medium">{tradeAnalysis.receiveValue}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};