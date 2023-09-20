import DemoHeader from "./components/DemoHeader";

export default function Layout({ children }) {
  return (
    <div className="flex justify-center">
      <DemoHeader></DemoHeader>
      {children}
    </div>
  );
}
