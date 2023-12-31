import React, { FormEvent, useState, useRef, useEffect } from 'react';
import * as api from './api';
import { Recipe } from './types';
import './App.css';
import { RecipeCard } from './components/recipeCard';
import RecipeModal from './components/RecipeModal';

type Tabs = 'search' | 'favourites';

const App = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
		undefined
	);
	const [selectedTab, setSelectedTab] = useState<Tabs>('search');
	const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]);
	const pageNumber = useRef(1);

	useEffect(() => {
		const fetchFavouriteRecipes = async () => {
			try {
				const favouriteRecipes = await api.getFavouriteRecipes();
				setFavouriteRecipes(favouriteRecipes.results);
			} catch (error) {
				console.error(error);
			}
		};

		fetchFavouriteRecipes();
	}, []);

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
			<div className="tabs">
				<h1 onClick={() => setSelectedTab('search')}> Recipe Search </h1>
				<h1 onClick={() => setSelectedTab('favourites')}> Favourites </h1>
			</div>
			{selectedTab === 'search' && (
				<>
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
						<RecipeCard
							recipe={recipe}
							onClick={() => setSelectedRecipe(recipe)}
						/>
					))}

					<button className="view-more-button" onClick={handleViewMoreClick}>
						View More
					</button>
				</>
			)}

			{selectedTab === 'favourites' && (
				<div>
					{favouriteRecipes.map((recipe) => (
						<RecipeCard
							recipe={recipe}
							onClick={() => setSelectedRecipe(recipe)}
						/>
					))}
				</div>
			)}

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
