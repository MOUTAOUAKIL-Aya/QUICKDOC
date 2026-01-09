import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {

  const { user, signOut, profileCompleted } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/health-dashboard-homepage', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/ai-symptom-checker', label: 'Symptom Checker', icon: 'Stethoscope' },
    { path: '/doctor-consultation', label: 'Consultations', icon: 'UserRound' },
    { path: '/pharmacy-services', label: 'Pharmacy', icon: 'Pill' },
  ];

  const moreItems = [
    { path: '/medical-records', label: 'Medical Records', icon: 'FileText' },
    { path: '/trust-compliance-center', label: 'Trust & Compliance', icon: 'Shield' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Activity" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-foreground font-headline">QuickDoc</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={toggleMoreMenu}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name="MoreHorizontal" size={18} />
                  <span>More</span>
                </button>

                {isMoreMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsMoreMenuOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 animate-slide-up">
                      {moreItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMoreMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                            isActivePath(item.path)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-popover-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon name={item.icon} size={18} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>

          {/* Right side: Auth */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors hidden lg:inline-block"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors hidden lg:inline-block"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors">
                  <span>{user.name}</span>
                  <Icon name="ChevronDown" size={16} />
                </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {!profileCompleted && (
                  <Link
                    to="/complete-profile"
                    className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border"
                  >
                    Complete Profile
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border"
                >
                  Profile
                </Link>

                <button
                  onClick={signOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
            )}

            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Icon name="Bell" size={20} />
            </Button>
            <Link to="/doctor-consultation">
              <Button variant="default" className="hidden lg:flex">
                Book Consultation
              </Button>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-background z-50 lg:hidden overflow-y-auto animate-slide-in-left">
            <nav className="flex flex-col p-4 gap-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              {!user && (
                <>
                  <Link
                    to="/signin"
                    onClick={closeMobileMenu}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
