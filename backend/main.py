import logging
from fastapi import FastAPI, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List, Dict, Union

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from typing import Dict, List, Union
from pydantic import BaseModel

class NodeData(BaseModel):
    id: str
    nodeType: str
    inputHeight: Union[float, None] = None  # Use float to match the payload, with None if optional

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]  # x and y positions are floats
    data: NodeData

class Edge(BaseModel):
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes, edges):
    from collections import defaultdict, deque

    # Build graph and in-degree count
    graph = defaultdict(list)
    in_degree = {node.id: 0 for node in nodes}  # Use node.id here
    
    for edge in edges:
        source, target = edge.source, edge.target  # Use edge.source and edge.target
        graph[source].append(target)
        in_degree[target] += 1

    # Topological sort using in-degree
    queue = deque([node for node in in_degree if in_degree[node] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(nodes)

@app.post('/pipelines/parse')
async def parse_pipeline(data: PipelineData):
    try:
        logger.info("Received data: %s", data.json())
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)
        is_dag_graph = is_dag(data.nodes, data.edges)
        return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag_graph}
    except ValidationError as e:
        logger.error("Validation Error: %s", e.json())
        raise HTTPException(status_code=422, detail="Invalid data format")
    except Exception as e:
        logger.error("An error occurred: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
