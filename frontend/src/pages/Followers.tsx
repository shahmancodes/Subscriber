import { useState } from 'react';
import { toast } from 'sonner';
import { Users, Search, RefreshCw, Instagram, Linkedin, Twitter } from 'lucide-react';
import { getFollowers } from '../api/followers';
import { SocialMediaResponse, SocialMediaData } from '../types';
import PlatformCard from '../components/PlatformCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Followers = () => {
  const [usernames, setUsernames] = useState({
    instagram: '',
    linkedin: '',
    twitter: '',
  });
  const [results, setResults] = useState<SocialMediaResponse>({});
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (platform: string, value: string) => {
    setUsernames(prev => ({
      ...prev,
      [platform]: value.trim()
    }));
  };

  const handleSearch = async () => {
    const hasAnyUsername = Object.values(usernames).some(username => username.length > 0);
    
    if (!hasAnyUsername) {
      toast.error('Please enter at least one username');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const request: any = {};
      if (usernames.instagram) request.instagram_username = usernames.instagram;
      if (usernames.linkedin) request.linkedin_username = usernames.linkedin;
      if (usernames.twitter) request.twitter_username = usernames.twitter;

      const data = await getFollowers(request);
      setResults(data);
      toast.success('Follower data updated successfully!');
    } catch (error) {
      console.error('Error fetching followers:', error);
      toast.error('Failed to fetch follower data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (platform: string) => {
    const platformUsernames: any = {};
    
    switch (platform) {
      case 'instagram':
        if (!usernames.instagram) return;
        platformUsernames.instagram_username = usernames.instagram;
        break;
      case 'linkedin':
        if (!usernames.linkedin) return;
        platformUsernames.linkedin_username = usernames.linkedin;
        break;
      case 'twitter':
        if (!usernames.twitter) return;
        platformUsernames.twitter_username = usernames.twitter;
        break;
      default:
        return;
    }

    try {
      const data = await getFollowers(platformUsernames);
      setResults(prev => ({
        ...prev,
        [platform]: data[platform as keyof SocialMediaResponse]
      }));
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} data refreshed!`);
    } catch (error) {
      toast.error(`Failed to refresh ${platform} data`);
    }
  };

  const handleUpdateFollowers = (platform: string, newCount: number) => {
    const platformData = results[platform as keyof SocialMediaResponse];
    if (platformData && !('error' in platformData)) {
      setResults(prev => ({
        ...prev,
        [platform]: {
          ...platformData,
          followers: newCount
        }
      }));
      toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} follower count updated!`);
    }
  };

  const handleUpdateAll = () => {
    const updates: Array<{ platform: string; data: SocialMediaData }> = [];
    
    Object.entries(results).forEach(([platform, data]) => {
      if (data && !('error' in data)) {
        updates.push({ platform, data });
      }
    });

    if (updates.length === 0) {
      toast.error('No valid data to update');
      return;
    }

    // Simulate batch update - in real app, this would be an API call
    toast.success(`Updated ${updates.length} platform(s) successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Followers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your social media usernames to track your follower counts across multiple platforms
          </p>
        </div>

        {/* Search Form */}
        <div className="card max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Instagram className="inline w-4 h-4 mr-2" />
                Instagram Username
              </label>
              <input
                type="text"
                value={usernames.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="elonmusk"
                className="input-field"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Linkedin className="inline w-4 h-4 mr-2" />
                LinkedIn Username
              </label>
              <input
                type="text"
                value={usernames.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="charlie-bowsher-21380112b"
                className="input-field"
              />
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Twitter className="inline w-4 h-4 mr-2" />
                X (Twitter) Username
              </label>
              <input
                type="text"
                value={usernames.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="elonmusk"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="btn-primary inline-flex items-center text-lg px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Followers
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Follower Counts
              </h2>
              {Object.keys(results).length > 0 && (
                <button
                  onClick={handleUpdateAll}
                  className="btn-secondary inline-flex items-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update All
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <PlatformCard
                    key={index}
                    data={{ platform: 'Loading', username: '', followers: 0 }}
                    isLoading={true}
                  />
                ))}
              </div>
            ) : Object.keys(results).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.instagram && (
                  <PlatformCard
                    data={results.instagram}
                    onRefresh={() => handleRefresh('instagram')}
                    onUpdate={(count) => handleUpdateFollowers('instagram', count)}
                  />
                )}
                {results.linkedin && (
                  <PlatformCard
                    data={results.linkedin}
                    onRefresh={() => handleRefresh('linkedin')}
                    onUpdate={(count) => handleUpdateFollowers('linkedin', count)}
                  />
                )}
                {results.twitter && (
                  <PlatformCard
                    data={results.twitter}
                    onRefresh={() => handleRefresh('twitter')}
                    onUpdate={(count) => handleUpdateFollowers('twitter', count)}
                  />
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try searching with different usernames or check if the usernames are correct
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Followers; 