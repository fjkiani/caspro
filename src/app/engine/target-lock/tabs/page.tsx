import { permanentRedirect } from 'next/navigation';

/** Legacy /tabs/ URL — canonical surface is now /engine/target-lock/. */
export default function TargetLockTabsRedirect() {
  permanentRedirect('/engine/target-lock/');
}
