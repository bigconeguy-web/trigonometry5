import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { TAB_CLOAK_PRESETS, applyTabCloak } from '../utils/curriculumLogic';

interface TabCloakModalProps {
  onClose: () => void;
  currentPresetId: string;
  onSelectPreset: (id: string) => void;
}

export const TabCloakModal: React.FC<TabCloakModalProps> = ({
  onClose,
  currentPresetId,
  onSelectPreset,
}) => {
  const handleSelect = (id: string) => {
    onSelectPreset(id);
    applyTabCloak(id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-zinc-200 w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900">
              Browser Tab Disguise
            </h2>
            <p className="text-xs text-zinc-500">
              Stealth camouflage: change the browser tab title and favicon
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-2">
          {TAB_CLOAK_PRESETS.map((preset) => {
            const isSelected = currentPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelect(preset.id)}
                className={`w-full p-3.5 rounded-lg border text-left flex items-center justify-between transition ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-50'
                    : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-zinc-900">
                    {preset.label}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 truncate max-w-[280px]">
                    Tab Title: "{preset.title}"
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-zinc-50 border-t border-zinc-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
