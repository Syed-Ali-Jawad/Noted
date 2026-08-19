import type { LucideProps } from "lucide-react";

const Writing = (props: LucideProps) => (
  <svg
    width="23"
    height="20"
    viewBox="0 0 23 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 12.5V10H8.75V12.5H0ZM0 7.5V5H13.75V7.5H0ZM0 2.5V0H13.75V2.5H0ZM11.25 20V16.1562L18.1562 9.28125C18.3438 9.09375 18.5521 8.95833 18.7812 8.875C19.0104 8.79167 19.2396 8.75 19.4688 8.75C19.7188 8.75 19.9583 8.79688 20.1875 8.89062C20.4167 8.98438 20.625 9.125 20.8125 9.3125L21.9688 10.4688C22.1354 10.6562 22.2656 10.8646 22.3594 11.0938C22.4531 11.3229 22.5 11.5521 22.5 11.7812C22.5 12.0104 22.4583 12.2448 22.375 12.4844C22.2917 12.724 22.1562 12.9375 21.9688 13.125L15.0938 20H11.25ZM19.4688 13L20.625 11.7812L19.4688 10.625L18.2812 11.8125L19.4688 13Z"
      fill="#F38B68"
    />
  </svg>
);

const Image = (props: LucideProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2V18M2 16H16V16V16V2V2V2H2V2V2V16V16V16V16M3 14H15L11.25 9L8.25 13L6 10L3 14V14M2 16V16V16V2V2V2V2V2V2V16V16V16V16V16"
      fill="#96918C"
    />
  </svg>
);

const BlockNoteIcon = () => (
  <svg
    viewBox="0 0 10 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="bn-tick-icon"
    style={{
      width: "calc(0.625rem * var(--mantine-scale))",
      height: "calc(0.625rem * var(--mantine-scale)",
    }}
  >
    <path
      d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z"
      fill="currentColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
);

const RestoreFromTrash = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props}
  >
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M5 9l1.3 11.05A2 2 0 0 0 8.28 22h7.44a2 2 0 0 0 1.98-1.95L19 9" />
    <line x1="10" y1="13" x2="10" y2="18" />
    <line x1="14" y1="13" x2="14" y2="18" />
    <path d="M12 7V2" />
    <path d="M8.5 4.5L12 1l3.5 3.5" />
  </svg>
);

const Icons = {
  Writing,
  Image,
  RestoreFromTrash,
  BlockNoteIcon,
};

export default Icons;
