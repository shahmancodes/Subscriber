import { Instagram, Linkedin, Twitter, Users, RefreshCw, Edit3, Check, X } from 'lucide-react';
import { useState } from 'react';
import { SocialMediaData } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface PlatformCardProps {
  data: SocialMediaData | { error: string };
  isLoading?: boolean;
  onRefresh?: () => void;
  onUpdate?: (newFollowers: number) => void;
}

const PlatformCard = ({ data, isLoading = false, onRefresh, onUpdate }: PlatformCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempFollowers, setTempFollowers] = useState('');

  const hasError = 'error' in data;
  const platformData = hasError ? null : data;

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-6 w-6" />;
      case 'linkedin':
        return <Linkedin className="h-6 w-6" />;
      case 'x (twitter)':
      case 'twitter':
        return <Twitter className="h-6 w-6" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return 'text-pink-600 bg-pink-50';
      case 'linkedin':
        return 'text-blue-700 bg-blue-50';
      case 'x (twitter)':
      case 'twitter':
        return 'text-sky-600 bg-sky-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toLocaleString();
  };

  const handleEdit = () => {
    if (platformData) {
      setTempFollowers(platformData.followers.toString());
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    const newCount = parseInt(tempFollowers);
    if (!isNaN(newCount) && newCount >= 0 && onUpdate) {
      onUpdate(newCount);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempFollowers('');
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center h-32">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="card border-red-200 bg-red-50">
        <div className="text-center">
          <div className="text-red-600 mb-2">
            <Users className="h-8 w-8 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-1">Error</h3>
          <p className="text-sm text-red-600">{data.error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="mt-3 inline-flex items-center text-sm text-red-700 hover:text-red-800"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getPlatformColor(platformData!.platform)}`}>
            {getPlatformIcon(platformData!.platform)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{platformData!.platform}</h3>
            <p className="text-sm text-gray-500">@{platformData!.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onUpdate && (
            <button
              onClick={handleEdit}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Edit follower count"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          )}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
              title="Refresh data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {isEditing ? (
            <div className="flex items-center justify-center space-x-2">
              <input
                type="number"
                value={tempFollowers}
                onChange={(e) => setTempFollowers(e.target.value)}
                className="w-32 text-center text-2xl font-bold border border-gray-300 rounded px-2 py-1"
                autoFocus
              />
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            formatFollowers(platformData!.followers)
          )}
        </div>
        <p className="text-sm text-gray-500">Followers</p>
      </div>
    </div>
  );
};

export default PlatformCard; 