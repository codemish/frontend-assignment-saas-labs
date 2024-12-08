import { render, screen } from "@testing-library/react";
import ProjectDetails from "../project-details";
import { useQueryHook } from "../../../hooks";

jest.mock("../../../hooks");

describe("ProjectDetails Component", () => {
  test("displays loading spinner while fetching data", () => {
    useQueryHook.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<ProjectDetails />);

    const loader = screen.getByLabelText(/grid-loading/i);
    expect(loader).toBeInTheDocument();
  });

  test("renders data when the API request is successful", () => {
    useQueryHook.mockReturnValue({
      data: [
        {
          "s.no": 1,
          "amt.pledged": 1000,
          currency: "usd",
          "percentage.funded": "50%",
        },
        {
          "s.no": 2,
          "amt.pledged": 1500,
          currency: "usd",
          "percentage.funded": "75%",
        },
        {
          "s.no": 3,
          "amt.pledged": 2000,
          currency: "usd",
          "percentage.funded": "100%",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<ProjectDetails />);

    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Amount pledged")).toBeInTheDocument();
    expect(screen.getByText("Percentage funded")).toBeInTheDocument();
  });

  test("renders empty state if no data is returned", () => {
    useQueryHook.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<ProjectDetails />);

    expect(screen.getByText("No Entries found")).toBeInTheDocument();
  });

  test("shows error message if there is an error fetching data", () => {
    useQueryHook.mockReturnValue({
      data: null,
      isLoading: false,
      error: "Something went wrong",
    });

    render(<ProjectDetails />);

    expect(
      screen.getByText(/Error While Loading the projects/i)
    ).toBeInTheDocument();
  });
});
