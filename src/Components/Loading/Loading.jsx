import ClipLoader from "react-spinners/ClipLoader";
export default function Loading() {
  return (
    <ClipLoader
      color={"rgba(0,0,0,0.2)"}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        borderColor: "var(--color-primary)",
      }}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
