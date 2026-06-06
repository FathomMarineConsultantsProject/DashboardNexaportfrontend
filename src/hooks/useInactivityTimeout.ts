import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { logout, updateActivityTimestamp } from "../features/auth/authSlice";

export const useInactivityTimeout = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const twoHoursInMs = 2 * 60 * 60 * 1000; // 2 Ghante
    let timeoutId: NodeJS.Timeout;

    const checkInactivity = () => {
      const lastActive = localStorage.getItem("np_last_active");
      if (lastActive) {
        const timePassed = Date.now() - parseInt(lastActive, 10);
        if (timePassed >= twoHoursInMs) {
          dispatch(logout());
          window.location.href = "/login"; // Force Redirect
        }
      }
    };

    const resetTimer = () => {
      // LocalStorage timestamp update karo Redux toggle se
      dispatch(updateActivityTimestamp());
      
      // Purane timer ko clear karke naya set karo
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkInactivity, twoHoursInMs);
    };

    // Users ke movements scan ke events trackers
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

    // Listeners bind karna
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));

    // Initial check setup on mount/reload
    timeoutId = setTimeout(checkInactivity, twoHoursInMs);

    // Cleanup listeners when component unmounts
    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };
  }, [isAuthenticated, dispatch]);
};