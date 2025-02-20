import { register } from "service-worker-register";

register("service-worker.js", {
  registrationStrategy: "registerWhenStable",
})
  .then((registration) => {
    console.log("Service worker registered:", registration);
  })
  .catch((error) => {
    console.error("Service worker registration failed:", error);
  });
