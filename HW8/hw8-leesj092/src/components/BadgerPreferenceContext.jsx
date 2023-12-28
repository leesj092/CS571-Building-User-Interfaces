import { useState, createContext, useEffect } from "react";

export const BadgerPreferenceContext = createContext();

export function BadgerPreferenceProvider({ children }) {
  const [preferences, setPreferences] = useState({});
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const defaultPrefs = tags.reduce((arr, tag) => {
      arr[tag] = true;
      return arr;
    }, {});
    setPreferences(defaultPrefs);
  }, [tags]);

  return (
    <BadgerPreferenceContext.Provider
      value={{ preferences, setPreferences, tags, setTags }}
    >
      {children}
    </BadgerPreferenceContext.Provider>
  );
}
