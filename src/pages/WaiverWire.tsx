import React from 'react';
import { Zap, TrendingUp, AlertCircle, Crown, Lock } from 'lucide-react';
import { mockWaiverPlayers } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export const WaiverWire: React.FC = () => {
  const { user } = useAuth();

  const canAccessWaiverWire = user && user.tier === 'pro';

  if (!canAccessWaiverWire) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-yellow-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Crown className="h-12 w-12 text-yellow-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pro Feature</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            The AI-powered Waiver Wire Optimizer is exclusive to Pro subscribers. 
            Get weekly recommendations with priority scoring and advanced analytics.
          </p>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-yellow-800 mb-2">Pro Features Include:</h3>
            <ul className="text-yellow-700 text-sm space-y-1 text-left">
              <li>• Weekly top 5 waiver wire picks</li>
              <li>• AI-powered priority scoring</li>
              <li>• Advanced injury risk analysis</li>
              <li>• Schedule-based value assessment</li>
              <li>• Real-time availability tracking</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Zap className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">AI Waiver Wire Optimizer</h1>
        </div>
        <p className="text-gray-600">Weekly recommendations powered by advanced analytics</p>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">This week's algorithm weighting:</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Recent Performance (40%) • Season Average (40%) • Availability (15%) • Injury Risk (5%)
          </p>
        </div>
      </div>

      {/* Top Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <span>Top 5 Waiver Wire Picks</span>
          </h2>
          <p className="text-gray-600 text-sm mt-1">Prioritized recommendations for this week</p>
        </div>

        <div className="divide-y divide-gray-100">
          {mockWaiverPlayers.map((player, index) => (
            <div key={player.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-700' :
                    index === 2 ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{player.name}</h3>
                      <p className="text-gray-600">{player.team} - {player.position}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {player.priority}
                      </div>
                      <div className="text-xs text-gray-500">Priority Score</div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Availability</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${player.availability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{player.availability}%</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600 mb-1">Recent Performance</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${player.recentPerformance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{player.recentPerformance}%</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="text-sm text-yellow-700 mb-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Why Now?
                      </div>
                      <p className="text-xs text-yellow-800 leading-tight">{player.reason}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Weekly Trends</span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Players trending up</span>
              <span className="font-semibold text-green-600">8 players</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">New injury concerns</span>
              <span className="font-semibold text-red-600">2 players</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Schedule advantages</span>
              <span className="font-semibold text-blue-600">5 players</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <span>AI Insights</span>
          </h3>
          <div className="space-y-3">
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
              <div className="text-sm font-medium text-purple-800 mb-1">
                Top Opportunity
              </div>
              <p className="text-purple-700 text-xs">
                Guards seeing increased usage due to recent injuries
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
              <div className="text-sm font-medium text-blue-800 mb-1">
                Schedule Alert
              </div>
              <p className="text-blue-700 text-xs">
                5 players have 4+ games next week vs league average of 3.2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};