/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { GAME_CATALOG } from './data/gamesCatalog';
import { buildDashboardBlobHtml } from './utils/blobMenuBuilder';

export default function App() {
  const launchedRef = useRef(false);
  const openedTabRef = useRef<Window | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    document.title = fallbackUrl ? 'Dashboard' : 'New Tab';
  }, [fallbackUrl]);

  useEffect(() => {
    const handleLaunch = () => {
      if (launchedRef.current && openedTabRef.current && !openedTabRef.current.closed) {
        return;
      }
      if (fallbackUrl) {
        return;
      }

      launchedRef.current = true;

      try {
        if (!blobUrlRef.current) {
          const menuHtml = buildDashboardBlobHtml(GAME_CATALOG);
          const blob = new Blob([menuHtml], { type: 'text/html;charset=utf-8' });
          blobUrlRef.current = URL.createObjectURL(blob);
        }

        const blobUrl = blobUrlRef.current;
        const win = window.open(blobUrl, '_blank');

        if (win) {
          openedTabRef.current = win;
        } else {
          // Fallback only if popup blocking prevents opening a separate blob: tab
          setFallbackUrl(blobUrl);
        }
      } catch {
        launchedRef.current = false;
      }
    };

    document.addEventListener('click', handleLaunch);
    return () => {
      document.removeEventListener('click', handleLaunch);
    };
  }, [fallbackUrl]);

  if (fallbackUrl) {
    return (
      <iframe
        src={fallbackUrl}
        title="Dashboard"
        className="fixed inset-0 w-screen h-screen border-0 block bg-[#0d0d10]"
        allow="autoplay; fullscreen; gamepad"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen m-0 p-0 bg-white overflow-hidden select-none cursor-default"
      aria-hidden="true"
    />
  );
}
