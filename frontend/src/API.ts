export const searchRecipes = async (searchTerm: string, page: number) => {
	const baseUrl = new URL('http://localhost:5550/api/recipes/search');
	baseUrl.searchParams.append('searchTerm', searchTerm);
	baseUrl.searchParams.append('page', page.toString());
	const response = await fetch(baseUrl);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return await response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
	const url = new URL(`http://localhost:5550/api/recipes/${recipeId}/summary`);
	url.searchParams.append('recipeId', recipeId);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	return response.json();
};
