const KITSU_BASE_URL =
  process.env.KITSU_BASE_URL || "https://kitsu.io/api/edge";
const PAGE_LIMIT = 20;

const SORT_MAPPING = {
  "Most Popular": "-userCount",
  "Highest Rated": "-averageRating",
  "Recently Updated": "-updatedAt",
  "Recently Added": "-createdAt",
};

export class KitsuService {
  /**
   * Fetch manga items (manga only - no anime)
   */
  static async fetchItems(filters = {}, offset = 0, limit = PAGE_LIMIT) {
    const baseUrl = `${KITSU_BASE_URL}/manga`;

    const queryParams = new URLSearchParams();

    if (filters.status && filters.status !== "All") {
      queryParams.append("filter[status]", filters.status.toLowerCase());
    }

    if (filters.search) {
      queryParams.append("filter[text]", filters.search);
    }

    // Add subtype filter (manga, manhwa, manhua, etc.)
    if (filters.subtype && filters.subtype !== "All") {
      queryParams.append("filter[subtype]", filters.subtype.toLowerCase());
    }

    queryParams.append("page[limit]", limit.toString());
    queryParams.append("page[offset]", offset.toString());

    const sortValue =
      SORT_MAPPING[filters.sort] || filters.sort || "-userCount";
    queryParams.append("sort", sortValue);

    const url = `${baseUrl}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API Error ${response.status}: ${
          errorData.errors?.[0]?.detail ||
          errorData.errors?.[0]?.title ||
          errorData.message ||
          response.statusText ||
          "Unknown API error"
        }`
      );
    }

    return response.json();
  }

  /**
   * Fetch manga details by ID
   */
  static async fetchItemDetails(id) {
    const baseUrl = `${KITSU_BASE_URL}/manga/${id}`;
    const chaptersUrl = `${KITSU_BASE_URL}/manga/${id}/chapters`;

    const response = await fetch(baseUrl, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Try to fetch chapters
    let chapters = [];
    try {
      const chaptersResponse = await fetch(chaptersUrl, {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
        },
      });

      if (chaptersResponse.ok) {
        const chaptersData = await chaptersResponse.json();
        chapters = chaptersData.data || [];
      }
    } catch (err) {
      console.error("Error fetching chapters:", err);
    }

    return {
      item: data.data,
      chapters,
    };
  }

  /**
   * Fetch a random manga
   */
  static async fetchRandomItem(filters = {}) {
    const baseUrl = `${KITSU_BASE_URL}/manga`;

    const queryParams = new URLSearchParams();

    if (filters.status && filters.status !== "All") {
      queryParams.append("filter[status]", filters.status.toLowerCase());
    }

    if (filters.search) {
      queryParams.append("filter[text]", filters.search);
    }

    if (filters.subtype && filters.subtype !== "All") {
      queryParams.append("filter[subtype]", filters.subtype.toLowerCase());
    }

    const sortValue = SORT_MAPPING[filters.sort] || "-userCount";
    queryParams.append("sort", sortValue);
    queryParams.append("page[limit]", "1");

    const initialUrl = `${baseUrl}?${queryParams.toString()}`;

    const initialResponse = await fetch(initialUrl, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!initialResponse.ok) {
      throw new Error(
        `API Error ${initialResponse.status}: ${initialResponse.statusText}`
      );
    }

    const initialData = await initialResponse.json();
    const totalCount = initialData.meta?.count || 0;

    if (totalCount === 0) {
      throw new Error("No manga found with the current filters");
    }

    const totalPages = Math.min(Math.ceil(totalCount / PAGE_LIMIT), 100);
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const offset = (randomPage - 1) * PAGE_LIMIT;

    queryParams.set("page[limit]", PAGE_LIMIT.toString());
    queryParams.set("page[offset]", offset.toString());

    const itemsUrl = `${baseUrl}?${queryParams.toString()}`;
    const itemsResponse = await fetch(itemsUrl, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
      },
    });

    if (!itemsResponse.ok) {
      throw new Error(
        `API Error ${itemsResponse.status}: ${itemsResponse.statusText}`
      );
    }

    const itemsData = await itemsResponse.json();

    if (!itemsData.data || itemsData.data.length === 0) {
      throw new Error("No manga returned from the API");
    }

    const randomIndex = Math.floor(Math.random() * itemsData.data.length);
    const randomItem = itemsData.data[randomIndex];

    return {
      item: randomItem,
    };
  }
}
