import { render, screen } from "@testing-library/react";
import { fiveSections, sixSections } from "fixtures/sectionOverTimeFixtures";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import SectionsInstructorTable from "main/components/Sections/SectionsInstructorTable";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Section tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Has the expected cell values", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={sixSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "Quarter",
      "Course ID",
      "Title",
      "Status",
      "Enrolled",
      "Location",
      "Days",
      "Time",
      "Instructor",
      "Enroll Code",
    ];
    const expectedFields = [
      "quarter",
      "courseInfo.courseId",
      "courseInfo.title",
      "status",
      "enrolled",
      "location",
      "days",
      "time",
      "instructor",
      "section.enrollCode",
    ];
    const testId = "SectionsInstructorTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("S22");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-time`),
    ).toHaveTextContent("9:30 AM - 10:45 AM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-days`),
    ).toHaveTextContent("T R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-status`),
    ).toHaveTextContent("Closed");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrolled`),
    ).toHaveTextContent("51/77");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-location`),
    ).toHaveTextContent("PHELP 1448");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-instructor`),
    ).toHaveTextContent("DANESHAMOOZ J, KILGORE J D, YANG YIFAN");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-courseInfo.courseId`),
    ).not.toHaveTextContent("CMPSC 130A -1");
  });

  test("Has the expected column headers and content", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={sixSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "Quarter",
      "Course ID",
      "Title",
      "Status",
      "Enrolled",
      "Location",
      "Days",
      "Time",
      "Instructor",
      "Enroll Code",
    ];
    const expectedFields = [
      "quarter",
      "courseInfo.courseId",
      "courseInfo.title",
      "status",
      "enrolled",
      "location",
      "days",
      "time",
      "instructor",
      "section.enrollCode",
    ];
    const testId = "SectionsInstructorTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`),
    ).toHaveTextContent("CMPSC 130A");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`),
    ).not.toHaveTextContent("CMPSC 130A -1");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.title`),
    ).toHaveTextContent("DATA STRUCT ALGOR");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("S22");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-time`),
    ).toHaveTextContent("9:30 AM - 10:45 AM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-days`),
    ).toHaveTextContent("T R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-status`),
    ).toHaveTextContent("Closed");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrolled`),
    ).toHaveTextContent("51/77");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-location`),
    ).toHaveTextContent("PSYCH 1902");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-instructor`),
    ).toHaveTextContent("LOKSHTANOV D");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-section.enrollCode`),
    ).toHaveTextContent("08078");
  });

  test("First dropdown is different than last dropdown", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={fiveSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const testId = "SectionsInstructorTable";

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-enrolled`),
    ).toHaveTextContent("84/80");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-enrolled`),
    ).toHaveTextContent("21/21");
  });

  test("Status utility identifies each type of status", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={fiveSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const testId = "SectionsInstructorTable";

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-status`),
    ).toHaveTextContent("Closed");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-status`),
    ).toHaveTextContent("Full");
    expect(
      screen.getByTestId(`${testId}-cell-row-3-col-status`),
    ).toHaveTextContent("Cancelled");
    expect(
      screen.getByTestId(`${testId}-cell-row-4-col-status`),
    ).toHaveTextContent("Open");
  });
});

const queryClient = new QueryClient();

describe("SectionsInstructorTable disableGroupBy tests", () => {

  test("checks that disableGroupBy is set to true", () => {
    const mockSections = [
      {
        courseInfo: {
          quarter: "S22",
          courseId: "CMPSC 130A",
          title: "Data Structures and Algorithms I",
        },
        section: {
          enrolledTotal: 40,
          maxEnroll: 50,
          timeLocations: [{ location: "PHELP 1448", days: "M W F", time: "9:00 AM - 10:00 AM" }],
          instructors: ["Suri"],
          enrollCode: "11111",
          status: "Open",
        }
      },
      {
        courseInfo: {
          quarter: "S22",
          courseId: "CMPSC 130B",
          title: "Data Structures and Algorithms II",
        },
        section: {
          enrolledTotal: 45,
          maxEnroll: 50,
          timeLocations: [{ location: "PHELP 1448", days: "T R", time: "11:00 AM - 12:30 PM" }],
          instructors: ["Johnson"],
          enrollCode: "22222",
          status: "Closed",
        }
      }
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsInstructorTable sections={mockSections} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const testId = "SectionsInstructorTable";

    const quarterCell = screen.getByTestId(`${testId}-cell-row-0-col-quarter`);
    expect(quarterCell).toHaveTextContent("S22");
    expect(quarterCell).not.toHaveClass("grouped");

    const courseIdColumn = screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`);
    expect(courseIdColumn).toHaveTextContent("CMPSC 130A");
    expect(courseIdColumn).not.toHaveClass("grouped"); 

    const titleColumn = screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.title`);
    expect(titleColumn).toHaveTextContent("Data Structures and Algorithms I");
    expect(titleColumn).not.toHaveClass("grouped"); 

    const statusColumn = screen.getByTestId(`${testId}-cell-row-0-col-status`);
    expect(statusColumn).toHaveTextContent("Open");
    expect(statusColumn).not.toHaveClass("grouped");

    const enrolledColumn = screen.getByTestId(`${testId}-cell-row-0-col-enrolled`);
    expect(enrolledColumn).toHaveTextContent("40/50");
    expect(enrolledColumn).not.toHaveClass("grouped");

    const locationColumn = screen.getByTestId(`${testId}-cell-row-0-col-location`);
    expect(locationColumn).toHaveTextContent("PHELP 1448");
    expect(locationColumn).not.toHaveClass("grouped");

    const daysColumn = screen.getByTestId(`${testId}-cell-row-0-col-days`);
    expect(daysColumn).toHaveTextContent("M W F");
    expect(daysColumn).not.toHaveClass("grouped");

    const timeColumn = screen.getByTestId(`${testId}-cell-row-0-col-time`);
    expect(timeColumn).toHaveTextContent("9:00 AM - 10:00 AM");
    expect(timeColumn).not.toHaveClass("grouped");

    const instructorColumn = screen.getByTestId(`${testId}-cell-row-0-col-instructor`);
    expect(instructorColumn).toHaveTextContent("Suri");
    expect(instructorColumn).not.toHaveClass("grouped");

    const enrollCodeColumn = screen.getByTestId(`${testId}-cell-row-0-col-section.enrollCode`);
    expect(enrollCodeColumn).toHaveTextContent("11111");
    expect(enrollCodeColumn).not.toHaveClass("grouped");
  });
});