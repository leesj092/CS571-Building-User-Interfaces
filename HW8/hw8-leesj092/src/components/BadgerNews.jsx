import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

import BadgerTabs from "./navigation/BadgerTabs";
import { BadgerPreferenceProvider } from "./BadgerPreferenceContext";

export default function BadgerNews(props) {
  return (
    <>
      <BadgerPreferenceProvider>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferenceProvider>
    </>
  );
}
