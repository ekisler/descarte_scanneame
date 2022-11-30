import React from "react";
import { connect } from "react-redux";
import { Chart } from "react-google-charts";
import { getCars, getUsers } from "../../Redux/Actions";
import { useEffect } from "react";
export const Graficos = ({ getUsers, getCars, Cars, allUsers }) => {
  useEffect(() => {
    getUsers();
    getCars();
  }, []);
  const data = [
    ["Meses ", "datos1"],
    ["Febrero", 200],
    ["Marzo", 300],
    ["Abril", 200],
    ["Mayo", 300],
    ["Junio", 100],
  ];
  ////////////////////////
  const da = [];
  for (let i = 0; i < allUsers.length; i++) {
    console.log(allUsers[i]);
    da.push([`${allUsers[i].firstName}`, allUsers[i].cars.length]);
  }
  da.unshift(["nombre", "# carros"]);
  ////////////////////////////
  const numpremium = allUsers.filter((e) => e.premium);
  let np=numpremium.length;
  let nu=allUsers.length;
  const dataPremium = [["Premium", " No Premium"], [`premium`,np],
[" No Premium", nu-np]];
  const options = {
    is3D: true,
    title: "Publicaciones por Usuario",
    legend: { position: "none" },
    backgroundColor: "#94a3b8",
    isStacked: true,
    Bar: { groupWidth: "100%" },
    chartArea: { width: "60%" },
    vAxis: {
      viewWindowMode: "explicit",
      viewWindow: {
        max: 30,
        min: 0,
      },
    },
  };
  const o = {
    backgroundColor: "#94a3b8",
    is3D: true,
    title: "Publicaciones por Usuario",
  };
  const oPre = {
    backgroundColor: "#94a3b8",
    is3D: true,
    title: "Usuarios Premium/No Premium",
  };
  return (
    <div>
      <div>
        <Chart
          height={400}
          chartType="ColumnChart"
          data={da}
          options={options}
        ></Chart>
      </div>
      <div>
        <Chart
          chartType="PieChart"
          data={da}
          options={o}
          width={"100%"}
          height={"400px"}
        ></Chart>
      </div>

      <div>
        <Chart
          chartType="PieChart"
          data={dataPremium}
          options={oPre}
          width={"100%"}
          height={"400px"}
        ></Chart>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Cars: state.allCars,
    Car: state.car,
    user: state.D_user,
    allUsers: state.allUsers,
    //temperaments: state.temperaments,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //infoUser: (e) => dispatch(infoUseremail(e)),
    getUsers: () => dispatch(getUsers()),
    getCars: () => dispatch(getCars()),
    /*getCars: () => dispatch(getCars()),
      Model: (e) => dispatch(filterForModel(e)),
      Brand: (e) => dispatch(filterForBrand(e)), */
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Graficos);
