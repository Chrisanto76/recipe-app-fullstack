import React, { FormEvent, useState, useRef } from 'react';
import * as api from './api';
import { Recipe } from './types';
import './App.css';
import { RecipeCard } from './components/recipeCard';
import RecipeModal from './components/RecipeModal';

const App = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
		undefined
	);
	const pageNumber = useRef(1);

	const handleSearchSubmit = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const recipes = await api.searchRecipes(searchTerm, 1);
			setRecipes(recipes.results);
		} catch (error) {
			console.error(error);
		}
	};

	const handleViewMoreClick = async () => {
		const nextPage = pageNumber.current + 1;
		try {
			const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
			setRecipes([...recipes, ...nextRecipes.results]);
			pageNumber.current = 1;
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<form onSubmit={(event) => handleSearchSubmit(event)}>
				<input
					type="text"
					required
					placeholder="Search for a recipe"
					value={searchTerm}
					onChange={(event) => setSearchTerm(event.target.value)}
				></input>
				<button type="submit">Submit</button>
			</form>
			{recipes.map((recipe) => (
				<RecipeCard recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
			))}

			<button className="view-more-button" onClick={handleViewMoreClick}>
				View More
			</button>

			{selectedRecipe ? (
				<RecipeModal
					recipeId={selectedRecipe.id.toString()}
					onClose={() => setSelectedRecipe(undefined)}
				/>
			) : null}
		</div>
	);
};

export default App;
