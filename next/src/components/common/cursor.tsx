'use client'

import { applyCursor } from "@/utils/cursor";
import React from "react";

export const AniCursors: React.FC = () => {
  React.useEffect(() => {
    applyCursor('a, button', '/cursor/link.ani')
  }, [])

  return null
}