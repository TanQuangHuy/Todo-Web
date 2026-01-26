package com.example.Backend.Services;

import com.example.Backend.DTO.Category.CategoryDTO;
import com.example.Backend.Entity.Category;
import com.example.Backend.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryDTO mapDTO(Category category) {
        return CategoryDTO.builder()
                .categoryName(category.getCategoryName())
                .categoryId(category.getCategoryId())
                .build();
    }

    public List<CategoryDTO> getAll() {
        return this.categoryRepository.findAll()
                .stream()
                .map(this::mapDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO getById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        return mapDTO(category);
    }

    public CategoryDTO create(CategoryDTO categoryDTO) {

        if (categoryRepository.existsByCategoryName(categoryDTO.getCategoryName())) {
            throw new RuntimeException(
                    "Category already exists with name: " + categoryDTO.getCategoryName()
            );
        }

        Category category = new Category();
        category.setCategoryName(categoryDTO.getCategoryName());

        return mapDTO(categoryRepository.save(category));
    }

    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        if (categoryDTO.getCategoryName() != null) {
            category.setCategoryName(categoryDTO.getCategoryName());
        }

        return mapDTO(categoryRepository.save(category));
    }

    public void delete(Long id) {

        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy danh mục để xóa");
        }

        categoryRepository.deleteById(id);
    }
}
