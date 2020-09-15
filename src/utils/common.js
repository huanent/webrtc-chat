import mitt from "mitt";

export function isOffer() {
  return location.search.includes("is-offer");
}

export const eventBus = mitt();
