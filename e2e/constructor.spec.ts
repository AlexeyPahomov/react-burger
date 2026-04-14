import { expect, test } from '@playwright/test';

const bun = {
  _id: 'bun-id',
  name: 'Тестовая булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 125,
  image: 'https://example.com/bun.png',
  image_large: 'https://example.com/bun-large.png',
  image_mobile: 'https://example.com/bun-mobile.png',
  __v: 0,
};

const main = {
  _id: 'main-id',
  name: 'Тестовая начинка',
  type: 'main',
  proteins: 20,
  fat: 20,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: 'https://example.com/main.png',
  image_large: 'https://example.com/main-large.png',
  image_mobile: 'https://example.com/main-mobile.png',
  __v: 0,
};

test('страница конструктора: drag and drop, заказ и модальные окна', async ({
  page,
}) => {
  const dropIngredient = async (ingredientTestAttr: string): Promise<void> => {
    const source = page.locator(`[data-test="${ingredientTestAttr}"]`);
    const target = page.locator('[data-test="constructor-drop-area"]');
    const dataTransfer = await page.evaluateHandle(() => new DataTransfer());

    await source.dispatchEvent('dragstart', { dataTransfer });
    await target.dispatchEvent('dragover', { dataTransfer });
    await target.dispatchEvent('drop', { dataTransfer });
    await source.dispatchEvent('dragend', { dataTransfer });
  };

  await page.route('**/api/ingredients', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: [bun, main],
      }),
    });
  });

  await page.route('**/api/auth/user', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          email: 'test@example.com',
          name: 'Test User',
        },
      }),
    });
  });

  await page.route('**/api/orders', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.fallback();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        name: 'Тестовый бургер',
        order: {
          number: 123456,
        },
      }),
    });
  });

  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'Bearer test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');
  });

  await page.goto('/');
  await expect(page.getByText('Соберите бургер')).toBeVisible();
  await expect(page).not.toHaveURL(/\/login$/);

  await page.getByRole('link', { name: bun.name }).click();
  await expect(page.getByText('Детали ингредиента')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText('Детали ингредиента')).toBeHidden();
  await expect(page).toHaveURL('/');

  await dropIngredient(`ingredient-${bun._id}`);
  await dropIngredient(`ingredient-${main._id}`);

  const constructorDropArea = page.locator('[data-test="constructor-drop-area"]');
  await expect(page.getByText(`${bun.name} (верх)`)).toBeVisible();
  await expect(page.getByText(`${bun.name} (низ)`)).toBeVisible();
  await expect(constructorDropArea.getByText(main.name)).toBeVisible();

  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await expect(page.getByText('идентификатор заказа')).toBeVisible();
  await expect(page.getByText('123456')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByText('идентификатор заказа')).toBeHidden();
});
