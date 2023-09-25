import { Fragment } from "react";
import FourQuadrant from "./components/FourQuadrant";

export default function page() {
    return (
        <Fragment>
            <main className="flex flex-grow flex-col gap-5 px-8 py-4 col-span-2 h-full overflow-auto">
                <FourQuadrant />
            </main>
        </Fragment>
    );
}
