import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function KakaoMap(){

    const moveX = useRef(null);
    const moveY = useRef(null);
    const mapRef = useRef(null);
    const txtStaionName = useRef(null);

    const [info, setInfo] = useState();
    const [markerPosition1, setMarkerPosition1] = useState({
        position:
        {
            lat: 37.365866,
            lng: 126.657946,
        },
        stationid: "39864",
        stationName:"삼성바이오로직스",
    });
    const [markerPosition2, setMarkerPosition2] = useState({
        position:
            {
                lat: 37.364886,
                lng: 126.65766
            },
        stationid: "39863",
        stationName:"삼성바이오로직스",
    });


    const [busPositions, setBusPositions] = useState([]);



    const btnMoveOnClick = () => {
        /* moveX의 값을 변수 x에 할당 */
        const lat = moveX.current.value.trim();
        const lng  = moveY.current.value.trim();

        setState({
            ...state,
            center:{ lat:   lat, lng: lng },
        })
    };

    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat:  37.364934, lng: 126.66261 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: false,
        level : 2,
    });

    const btnSearchStationOnClick = () => {
        const searchStationName = txtStaionName.current.value;
        console.log(searchStationName);
        /* axios를 통한 station 정보 호출 */
        axios({
            method:'GET',
            url : "/api-service/bus/getStations",
            header:{
                "Access-Control-Allow-Credentials":true,
            },
            params:{
                station:searchStationName,
            },
            responseType:'json'
        }).then(res=>{


            let ret = res.data.map((item)=>{
                return (
                    {
                        position:
                            {
                                lat: item["위도"],
                                lng: item["경도"]
                            },
                        stationid: item["정류장아이디"],
                        stationName:item["정류장 명칭"],
                    }
                );
            });
            console.log(ret);
            setBusPositions(ret);
        }).errors(e=>{
            alert(e);
        });

    };
    //버스정류장 정보


    const currentMyLocation = () => {
        if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition((position) => {

                console.log("현재 좌표 : " + position.coords.latitude + ", " + position.coords.longitude);
                if(info)
                {
                    setState({
                        ...state,
                         center: info.center,
                     });
                }
                

                setState({
                   ...state,
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    
                });

                //alert(state.center.lat + " " + state.center.lng);
            }, err=> {
                console.log(err.message);
            },
            {timeout:3000});
        }   
    };

      return (
        <>
        <div>현재 좌표 {state? state.center.lat : null} : {state? state.center.lng : null} </div>
          <Map // 지도를 표시할 Container
            center={state.center}
            isPanto={state.isPanto}
            style={{
              // 지도의 크기
              width: "100%",
              height: "450px",
            }}
            level={state.level} // 지도의 확대 레벨
            ref={mapRef}
            onCenterChanged={() => {
                const map = mapRef.current;
                setInfo({
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    },
                    level: map.getLevel(),
                    typeId: map.getMapTypeId(),
                    swLatLng: {
                        lat: map.getBounds().getSouthWest().getLat(),
                        lng: map.getBounds().getSouthWest().getLng(),
                    },
                    neLatLng: {
                        lat: map.getBounds().getNorthEast().getLat(),
                        lng: map.getBounds().getNorthEast().getLng(),
                    },
                    });
               
            }}
          >


            <MapMarker
                position={markerPosition1.position}
            >
                <div style={{color:"#000"}}>{markerPosition1.stationName} {markerPosition1.stationid}</div>
            </MapMarker>
          <MapMarker
              position={markerPosition2.position}
          ><div style={{color:"#000"}}>{markerPosition2.stationName}    {markerPosition2.stationid}</div></MapMarker>

              <div>
                  {
                      busPositions.map( (busPosition, index) => {
                          return (
                              <MapMarker
                                  key={index}
                                  position={busPosition.position}
                              >
                                  <div style={{color:"#000"}}>{busPosition.stationName} {busPosition.stationid}</div>
                              </MapMarker>
                          );
                      })
                  }
              </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  setState({
                    ...state,
                    center: { lat: 33.452613, lng: 126.570888 },
                  })
                }
              >
                지도 중심좌표 이동시키기
              </button>
              <button
                onClick={() =>
                  setState({
                    ...state,
                    center: { lat: 33.45058, lng: 126.574942 },
                  })
                }
              >
                지도 중심좌표 부드럽게 이동시키기
              </button>
              <button onClick={currentMyLocation}>현재 좌표 바꾸기</button>
              <button onClick={() => {
                const map = mapRef.current
                setInfo({
                center: {
                    lat: map.getCenter().getLat(),
                    lng: map.getCenter().getLng(),
                },
                level: map.getLevel(),
                typeId: map.getMapTypeId(),
                swLatLng: {
                    lat: map.getBounds().getSouthWest().getLat(),
                    lng: map.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                    lat: map.getBounds().getNorthEast().getLat(),
                    lng: map.getBounds().getNorthEast().getLng(),
                },
                })
             }}>
                정보 가져 오기!
            </button>
            <div>
                <input type={'text'} ref={moveX} />
                <input type={'text'} ref={moveY}/>
                <button onClick={btnMoveOnClick}>이동</button>
            </div>
            <div>
                버스 정류소 검색 :
                <input type={'text'} ref={txtStaionName}/>
                <button onClick={btnSearchStationOnClick}>정류소 검색</button>
            </div>
            </div>



          </Map>
          {info && (
            <div>
              <p>위도 : {info.center.lat}</p>
              <p>경도 : {info.center.lng}</p>
              <p>레벨 : {info.level}</p>
              <p>타입 : {info.typeId}</p>
              <p>남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}</p>
              <p>북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}</p>
            </div>
          )}
        </>
      )
}

export default KakaoMap;