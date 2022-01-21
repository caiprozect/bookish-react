import { gotoApp, checkAppTitle } from "../helpers";
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I am a bookish user`, () => {});
When(`I open the list page`, () => {
  gotoApp();
});
Then(`I can see the title {string} is listed`, (title) => {
  checkAppTitle(title);
});
