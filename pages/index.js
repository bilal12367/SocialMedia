import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store";

export default function Home() {
  const var1 = useSelector((state) => state.testVar);
  const dispatch = useDispatch();
  console.log("var1 :>> ", var1);
  return (
    <div className="d-flex flex-column">
      <h1>Home Component</h1>
      {var1}
      <div>
        <button
          className="btn btn-lg btn-outline-primary"
          onClick={() => {
            dispatch(actions.setTestVariable({ var: "Some New Data with redux" }));
          }}
        >
          {" "}
          Click Me{" "}
        </button>
      </div>
    </div>
  );
}
