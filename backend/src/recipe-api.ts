const apiKey = '62acc0d853fe448d8feebed04554e032';

export const searchRecipes = async (searchTerm: string, page: number) => {
	if (!apiKey) {
		throw new Error('API key not found');
	}

	const url = new URL('https://api.spoonacular.com/recipes/complexSearch');

	const queryParams = {
		apiKey: apiKey,
		query: searchTerm,
		number: '10',
		offset: (page * 10).toString(),
	};

	url.search = new URLSearchParams(queryParams).toString();

	try {
		const searchResponse = await fetch(url.toString());
		const resultsJson = await searchResponse.json();
		return resultsJson;
	} catch (error) {
		console.error(error);
	}
};

export const getRecipeSummary = async (recipeId: string) => {
	if (!apiKey) {
		throw new Error('API key not found');
	}
	const url = new URL(
		`https://api.spoonacular.com/recipes/${recipeId}/summary`
	);
	const params = {
		apiKey: apiKey,
	};
	url.search = new URLSearchParams(params).toString();

	const response = await fetch(url);
	const json = await response.json();

	return json;
};
