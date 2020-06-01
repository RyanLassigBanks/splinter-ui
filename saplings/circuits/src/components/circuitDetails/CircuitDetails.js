/**
 * Copyright 2018-2020 Cargill Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '../Content.scss';
import '../MainHeader.scss';
import './CircuitDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Switch, Link } from 'react-router-dom';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { useCircuitsState } from '../../state/circuits';
import { useParams } from 'react-router-dom'

import React from 'react';

const mockNodes = {
  data: [{
    identity: "node-123123-asdf",
    endpoints: [
      "tcps://12.0.0.123:8431"
    ],
    display_name: "Cargill - Node 1",
    keys: [
      "03e0e5086beffc640ec0d149d4f1197fdde0f338afac774541831281c6fd91cbe0"
    ],
    metadata: {
      company: "Cargill",
      status: "Up"
    }
  }]
};

const mockServices = {
    data:
      {
        id: "E9xLW-wcDnH",
        members: [
            "bubba-node-000",
            "acme-node-000"
        ],
        roster: [
            {
                service_id: "gr00",
                service_type: "scabbard",
                allowed_nodes: [
                    "bubba-node-000"
                ],
                arguments: {
                    admin_keys: "[\"0244526eec1191df0f9d4cfd37fbde40b951d73dcf852b5973a1b6564ed9b7915c\"]",
                    peer_services: "[\"gr01\"]"
                }
            },
            {
              service_id: "gr01",
              service_type: "scabbard",
              allowed_nodes: [
                "acme-node-000"
              ],
              arguments: {
                  admin_keys: "[\"0244526eec1191df0f9d4cfd37fbde40b951d73dcf852b5973a1b6564ed9b7915c\"]",
                  peer_services: "[\"gr00\"]"
              }
            }
        ],
        management_type: "gameroom"
     }
}

const CircuitDetails = () => {
  const { circuitId } = useParams();
  const [circuitState, circuitsDispatch] = useCircuitsState();
  return (
    <div>
      <div className="main-header">
        <div>
          <h4 className="circuits-title">
            Circuit {circuitId}
          </h4>
          <div className="managementType">
            Gameroom
            <span>
              <FontAwesomeIcon icon={faQuestionCircle}/>
            </span>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="midContent">
          <div className="circuit-stats">
            <div className="stat total-circuits">
              <span className="stat-count circuits-count">4</span>
              Nodes
            </div>
            <div className="stat action-required">
              <span className="stat-count action-required-count">
                2
              </span>
                Services
            </div>
          </div>
        </div>
        <div className="viewToggle">
          <span>
            <Link to={`/circuits/${circuitId}/nodes`}>nodes</Link>
          </span>
          |
          <span>
            <Link to={`/circuits/${circuitId}/services`}>services</Link>
          </span>
        </div>
        <Switch>
          <Route path="/circuits/:circuitId/nodes">
            <NodesTable nodes={mockNodes.data}/>
          </Route>
          <Route path="/circuits/:circuitId/services">
            <ServiceTable services={mockServices.data.roster}/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

const ServiceTable = ({services}) => {
  return (
    <div className="service-container">
      <div className="service-list">
        {
          services.map(service => {
            return (
              <div className="service-list-item">
                <div className="service-id">
                  {service.service_id}
                </div>
                <div className="service-type">
                  {service.service_type}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const NodesTable = ({nodes}) => {
  const noNodes = (
    <tr>
      <td colSpan="5" className="no-nodes-msg">
        No Nodes found for this circuit
      </td>
    </tr>
  );

  return (
    <div className="table-container">
      <table className="nodes-table">
        <tr className="table-header">
          <th>Name</th>
          <th>Alias</th>
          <th>Company</th>
          <th>Status</th>
        </tr>
        {nodes.length ? '' : noNodes}
        {
          nodes.map(node => {
            return (
              <tr className="table-row">
                <td>{node.identity}</td>
                <td>{node.display_name}</td>
                <td>{node.metadata.company || 'N/A'}</td>
                <td>{node.metadata.status || 'N/A'}</td>
              </tr>
            );
          })
        }
      </table>
    </div>
  );
}

export default CircuitDetails;
