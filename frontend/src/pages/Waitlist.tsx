import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, Users, Facebook, Youtube, Music, CheckCircle, Loader2 } from 'lucide-react';
import { submitWaitlist } from '../api/followers';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      description: 'Track your Facebook page followers and engagement',
      color: 'bg-blue-600',
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      description: 'Monitor your YouTube subscribers and video performance',
      color: 'bg-red-600',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Music,
      description: 'Keep track of your TikTok followers and viral content',
      color: 'bg-black',
    },
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    setLoading(true);

    try {
      // Submit for each selected platform
      await Promise.all(
        selectedPlatforms.map(() => 
          submitWaitlist(email)
        )
      );
      
      setSubmitted(true);
      toast.success('Successfully joined the waitlist!');
    } catch (error: any) {
      console.error('Waitlist submission error:', error);
      toast.error(error.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                You're on the list!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thanks for joining our waitlist. We'll notify you as soon as {selectedPlatforms.join(', ')} integration is available.
              </p>
            </div>

            <div className="card text-left mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></span>
                  We'll send you email updates on our development progress
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></span>
                  You'll get early access when the new platforms launch
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></span>
                  Beta testers get exclusive features and discounts
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                  setSelectedPlatforms([]);
                }}
                className="btn-secondary mr-4"
              >
                Join Another Platform
              </button>
              <a
                href="/followers"
                className="btn-primary"
              >
                Try Current Platforms
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join the Waitlist
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be the first to know when we add support for Facebook, YouTube, and TikTok. 
            Join our waitlist and get early access to new features!
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="card max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="input-field"
                required
              />
            </div>

            {/* Platform Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Users className="inline w-4 h-4 mr-2" />
                Which platforms are you interested in?
              </label>
              <div className="space-y-4">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatforms.includes(platform.id);
                  
                  return (
                    <div
                      key={platform.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handlePlatformToggle(platform.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className={`p-2 rounded-lg ${platform.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {platform.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'bg-primary-600 border-primary-600'
                              : 'border-gray-300'
                          }`}>
                            {isSelected && (
                              <CheckCircle className="w-4 h-4 text-white fill-current" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary inline-flex items-center text-lg px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining Waitlist...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Join Waitlist
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Early Access</h3>
            <p className="text-gray-600">Be among the first to try new platform integrations</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Updates</h3>
            <p className="text-gray-600">Get notified about new features and platform launches</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Beta Testing</h3>
            <p className="text-gray-600">Help shape the future of followers.me with your feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist; 