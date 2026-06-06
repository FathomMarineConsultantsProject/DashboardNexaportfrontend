import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, LogOut, Settings, UserCircle } from 'lucide-react'; // ✅ Added UserCircle

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-all group cursor-pointer">
      <button className="relative p-2 hover:bg-gray-200 rounded-full">
        <Bell size={20} className="text-gray-600" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </button>

      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* ✅ Fixed Avatar with fallback */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full ring-2 ring-gray-200 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <UserCircle size={48} className="text-gray-400" />
        )}
        
        <div className="min-w-0 flex-1">
          <div className="text-sm font-bold text-gray-900 truncate">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-gray-500 capitalize">{user?.role || 'Surveyor'}</div>
        </div>
      </div>

      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 ml-2">
        <Link 
          to="/settings" 
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          title="Settings"
        >
          <Settings size={16} />
        </Link>
        <button 
          onClick={handleLogout} 
          className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;