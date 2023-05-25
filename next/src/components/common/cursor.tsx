'use client'
import { applyCursor } from "@/utils/cursor";
import { FunctionComponent } from "react";

export const AniCursors: FunctionComponent = () => {
  const style = applyCursor('a, button', '/cursor/link.ani')

  return null
}