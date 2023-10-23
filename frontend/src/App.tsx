import React, { useState } from 'react';
import './App.css';

const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [recipe, setRecipe] = useState({});

	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
};

export default App;
