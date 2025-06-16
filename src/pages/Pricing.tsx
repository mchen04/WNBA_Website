import React from 'react';
import { Check, Zap, Star, Crown, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Pricing: React.FC = () => {
  const { user } = useAuth();

  const features = {
    free: [
      'Basic player statistics',
      'Current season averages',
      '2-player comparison tool',
      'Player rankings with filters',
      'Custom league scoring',
      'Injury status tracking'
    ],
    premium: [
      'Everything in Scout',
      'Trade analyzer with 1-100 scoring',
      'Advanced player analytics',
      'Trade value calculations',
      'Player efficiency ratings',
      'Unlimited player comparisons',
      'Trade history tracking',
      'Premium support'
    ],
    pro: [
      'Everything in Analyst',
      'AI-powered waiver wire optimizer',
      'Weekly top 5 waiver recommendations',
      'Complete ESPN data access (15+ categories)',
      'Advanced injury analysis',
      'Schedule-based value assessment',
      'Real-time data updates (30min)',
      'Historical performance trends',
      'Priority customer support'
    ]
  };

  const testimonials = [
    {
      name: 'Sarah M.',
      tier: 'Pro',
      quote: 'The waiver wire optimizer helped me win my league. Found gems nobody else saw coming!'
    },
    {
      name: 'Mike R.',
      tier: 'Premium',
      quote: 'Trade analyzer is incredible. Saved me from bad trades and found great value swaps.'
    },
    {
      name: 'Jessica L.',
      tier: 'Premium',
      quote: 'Finally, WNBA fantasy tools that actually work. The analytics are spot-on.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Competitive Edge
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From casual insights to championship-winning analytics, we have the right plan for every fantasy player
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Free Tier */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-8 relative">
          <div className="text-center mb-8">
            <div className="bg-gray-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Scout</h3>
            <div className="text-5xl font-bold text-gray-900 mb-2">Free</div>
            <p className="text-gray-600">Perfect for getting started</p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.free.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gray-600 text-white py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all transform hover:scale-105">
            Get Started Free
          </button>
        </div>

        {/* Premium Tier */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-200 p-8 relative transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
              Most Popular
            </span>
          </div>
          
          <div className="text-center mb-8">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyst</h3>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              $9.99<span className="text-lg text-gray-600">/month</span>
            </div>
            <p className="text-gray-600">For serious competitors</p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.premium.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all transform hover:scale-105">
            Start Free Trial
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">14-day free trial, then $9.99/month</p>
        </div>

        {/* Pro Tier */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-8 relative">
          <div className="text-center mb-8">
            <div className="bg-yellow-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Expert</h3>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              $19.99<span className="text-lg text-gray-600">/month</span>
            </div>
            <p className="text-gray-600">For championship winners</p>
          </div>

          <ul className="space-y-4 mb-8">
            {features.pro.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-yellow-600 text-white py-4 rounded-xl font-semibold hover:bg-yellow-700 transition-all transform hover:scale-105">
            Go Pro
          </button>
          <p className="text-center text-sm text-gray-500 mt-2">14-day free trial, then $19.99/month</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">5.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">{testimonial.name}</span>
                <span className="text-sm text-purple-600 font-medium">{testimonial.tier} User</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How does the free trial work?</h3>
            <p className="text-gray-600 text-sm">
              All premium plans include a 14-day free trial. No credit card required to start. Cancel anytime during the trial period.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What data sources do you use?</h3>
            <p className="text-gray-600 text-sm">
              We use ESPN's official WNBA API for all player statistics, ensuring accuracy and real-time updates throughout the season.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I customize scoring systems?</h3>
            <p className="text-gray-600 text-sm">
              Yes! All plans support custom league scoring configurations, including points, rebounds, assists, steals, blocks, and more.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How often is data updated?</h3>
            <p className="text-gray-600 text-sm">
              Free tier updates daily, Premium gets hourly updates, and Pro users receive real-time updates every 30 minutes during games.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Dominate Your League?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of fantasy players already using our platform
        </p>
        <button className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105">
          Start Your Free Trial
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};