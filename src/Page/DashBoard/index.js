import React, { useEffect } from 'react';
import LeftMenu from  "./leftMenu"
import ChartParent from "./chartParent"
import _ from "lodash"
function DashBoard(props) {

  useEffect(()=>{
    
  },[])

  return (
    <div className="dashboard chart-2">
      <main className="dashboard-outer main">
        <div className="control-panel">
          <LeftMenu {...props}/>
        </div>
        <div class="game-panel ">
         <ChartParent/>
        </div>
      </main>
    </div>
  )
}
export default DashBoard;
