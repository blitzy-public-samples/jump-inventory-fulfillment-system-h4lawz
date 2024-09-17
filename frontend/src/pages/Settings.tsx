import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApiConfigForm, UserManagement } from 'frontend/src/components/settings';
import { fetchSettingsAsync, updateSettingsAsync } from 'frontend/src/store/slices/settingsSlice';
import { getCurrentUser } from 'frontend/src/services/auth';

// HUMAN ASSISTANCE NEEDED
// The confidence level for this component is 0.6, which is below the threshold of 0.8.
// Additional review and potential modifications may be required to ensure production readiness.

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: any) => state.settings);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchSettingsAsync());
    const user = getCurrentUser();
    setCurrentUser(user);
  }, [dispatch]);

  const handleSettingsUpdate = (updatedSettings: any) => {
    dispatch(updateSettingsAsync(updatedSettings));
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <ApiConfigForm
        currentSettings={settings}
        onSettingsUpdate={handleSettingsUpdate}
      />
      {currentUser && currentUser.role === 'admin' && (
        <UserManagement />
      )}
    </div>
  );
};

export default Settings;