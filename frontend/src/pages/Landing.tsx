import { Link } from 'react-router-dom';
import { Users, Instagram, Linkedin, Twitter, ArrowRight, TrendingUp, Shield, Zap, Facebook, Youtube, Music } from 'lucide-react';
import SEO from '../components/SEO';

const Landing = () => {
  return (
    <>
      <SEO 
        title="followers.me - Social Media Follower Tracker"
        description="Track your social media followers across Instagram, LinkedIn, and Twitter in real-time. Monitor growth, get insights, and manage your social media presence all in one place."
        keywords="social media tracker, follower count, Instagram followers, LinkedIn followers, Twitter followers, social media analytics, follower growth, social media monitoring"
        url="https://followers.me/"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="gradient-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Track Your Social Media
                <span className="text-primary-600 block">Followers</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Monitor your follower count across Instagram, LinkedIn, and Twitter in real-time. 
                Get insights, track growth, and manage your social media presence all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/followers"
                  className="btn-primary inline-flex items-center text-lg px-8 py-4 rounded-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Track Followers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/waitlist"
                  className="btn-secondary inline-flex items-center text-lg px-8 py-4 rounded-xl"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Current Platforms */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Currently Supported Platforms
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Track your followers across these major social media platforms with real-time updates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-600 rounded-2xl mb-6">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Instagram</h3>
                <p className="text-gray-600 mb-4">Track your Instagram followers and engagement</p>
                <div className="inline-flex items-center text-pink-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-2xl mb-6">
                  <Linkedin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">LinkedIn</h3>
                <p className="text-gray-600 mb-4">Monitor your professional network growth</p>
                <div className="inline-flex items-center text-blue-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-600 rounded-2xl mb-6">
                  <Twitter className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">X (Twitter)</h3>
                <p className="text-gray-600 mb-4">Keep track of your X follower count</p>
                <div className="inline-flex items-center text-sky-600 font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Platforms */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're working hard to bring you support for these platforms. Join our waitlist to be notified when they're available!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white border border-gray-200 opacity-75">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Facebook</h3>
                <p className="text-gray-600 mb-4">Track your Facebook page followers</p>
                <div className="inline-flex items-center text-orange-600 font-medium">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Coming Soon
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white border border-gray-200 opacity-75">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-2xl mb-6">
                  <Youtube className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">YouTube</h3>
                <p className="text-gray-600 mb-4">Monitor your YouTube subscribers</p>
                <div className="inline-flex items-center text-orange-600 font-medium">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Coming Soon
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white border border-gray-200 opacity-75">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">TikTok</h3>
                <p className="text-gray-600 mb-4">Track your TikTok followers and views</p>
                <div className="inline-flex items-center text-orange-600 font-medium">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  Coming Soon
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/waitlist"
                className="btn-primary inline-flex items-center text-lg px-8 py-4 rounded-xl"
              >
                Join Waitlist for Updates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose followers.me?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Built for content creators, marketers, and social media enthusiasts who want to stay on top of their growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Get instant updates on your follower counts across all platforms. Never miss a milestone again.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure & Private</h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-level security. We never store your social media credentials.
                </p>
              </div>

              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6">
                  <Zap className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
                <p className="text-gray-600">
                  Built with modern technology for lightning-fast performance. Get your data in seconds, not minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Track Your Growth?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Start monitoring your social media followers today and never lose track of your growth again.
            </p>
            <Link
              to="/followers"
              className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl inline-flex items-center text-lg transition-colors"
            >
              <Users className="w-5 h-5 mr-2" />
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Landing; 