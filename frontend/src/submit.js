// submit.js
import { useStore } from './store';

export const getPipelineNodes = () => {
    const { nodes } = useStore.getState();
    return nodes.map(node => ({
        id: String(node.id),       // Ensure ID is a string
        type: node.type || '',     // Use empty string if type is undefined
        position: node.position || {}, // Ensure position is an object
        data: node.data || {}      // Ensure data is an object
    }));
};


export const getPipelineEdges = () => {
    const { edges } = useStore.getState();
    return edges.map(edge => ({
        source: String(edge.source),  // Ensure source and target are strings
        target: String(edge.target),
    }));
};

async function submitPipeline() {
    const nodes = getPipelineNodes();
    const edges = getPipelineEdges();
    console.log("Request Payload:", JSON.stringify({ nodes, edges }, null, 2)); // Log payload

    try {
        const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nodes, edges }),  // Ensure format matches model
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(`Number of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } else {
            console.error("Failed to submit pipeline", response.status);
        }
    } catch (error) {
        console.error("Error submitting pipeline", error);
    }
}


export const SubmitButton = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button id="submitButton" type="submit" onClick={submitPipeline}>Submit</button>
        </div>
    );
}
