const { CategoryService } = require('../Services/CategoryService');
const { ApiSerializer } = require('../Support/ApiSerializer');
const { Validator } = require('../Support/Validator');
const { errorJson } = require('../Support/Http');

class CategoryController {
  static index(req, res) {
    const skip = Math.max(0, parseInt(req.query.skip, 10) || 0);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const [rows, total] = CategoryService.listCategories(skip, limit);

    res.json({
      items: rows.map((row) => ApiSerializer.category(row)),
      total,
      skip,
      limit,
    });
  }

  static show(req, res) {
    const categoryId = parseInt(req.params.category_id, 10);
    const category = CategoryService.getById(categoryId);
    res.json(ApiSerializer.category(category));
  }

  static store(req, res) {
    const body = req.body || {};
    const error = Validator.firstError(body, {
      name: ['required', 'string', 'min:1', 'max:100'],
      description: ['nullable', 'string'],
    });
    if (error) {
      errorJson(res, error, 422);
      return;
    }

    const category = CategoryService.create(
      String(body.name),
      body.description ?? null,
    );
    res.status(201).json(ApiSerializer.category(category));
  }

  static update(req, res) {
    const categoryId = parseInt(req.params.category_id, 10);
    const body = req.body || {};
    const category = CategoryService.update(categoryId, body);
    res.json(ApiSerializer.category(category));
  }

  static destroy(req, res) {
    const categoryId = parseInt(req.params.category_id, 10);
    CategoryService.delete(categoryId);
    res.status(204).send();
  }
}

module.exports = { CategoryController };
