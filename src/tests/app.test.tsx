import { afterEach, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../app/App";
afterEach(() => {
  cleanup();
  localStorage.clear();
});
it("supports keyboard start, answers, selected state, results, alternative and reset", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.tab();
  expect(screen.getByRole("link", { name: "The Cut home" })).toHaveFocus();
  await user.tab();
  await user.keyboard("{Enter}");
  expect(
    screen.getByRole("heading", { name: "How long is your hair right now?" }),
  ).toHaveFocus();
  await user.click(screen.getByRole("button", { name: /Short A little/ }));
  await user.click(screen.getByRole("button", { name: "Straight" }));
  await user.click(screen.getByRole("button", { name: "Short" }));
  await user.click(screen.getByRole("button", { name: /Wash and go/ }));
  for (
    let i = 0;
    i < 5 &&
    !screen.queryByRole("heading", { name: "What to tell the barber" });
    i++
  ) {
    const group = screen.getByRole("group");
    const buttons = group.querySelectorAll("button");
    await user.click(buttons[buttons.length - 1]);
  }
  expect(
    screen.getByRole("heading", { name: "What to tell the barber" }),
  ).toBeInTheDocument();
  const alternatives = screen
    .getAllByRole("button")
    .filter((b) => b.classList.contains("haircut-card"));
  expect(alternatives.length).toBeGreaterThanOrEqual(2);
  await user.click(alternatives[0]);
  expect(screen.getAllByText("ANOTHER OPTION").length).toBeGreaterThan(0);
  await user.click(screen.getByRole("button", { name: "← Back to answers" }));
  expect(screen.getByRole("button", { pressed: true })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /Start over/ }));
  expect(
    screen.getByRole("button", { name: /Find my haircut/ }),
  ).toBeInTheDocument();
});
