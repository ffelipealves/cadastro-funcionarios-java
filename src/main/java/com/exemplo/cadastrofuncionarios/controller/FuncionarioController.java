package com.exemplo.cadastrofuncionarios.controller;

import com.exemplo.cadastrofuncionarios.model.Funcionario;
import com.exemplo.cadastrofuncionarios.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // Endpoint para listar todos os funcionários
    @GetMapping
    public ResponseEntity<List<Funcionario>> listarTodos() {
        List<Funcionario> funcionarios = funcionarioService.listarTodos();
        
        if (funcionarios.isEmpty()) {
            return ResponseEntity.noContent().build(); // Retorna 204 No Content
        }
    
        return ResponseEntity.ok(funcionarios);
    }

    // Endpoint para buscar um funcionário pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("O ID deve ser um número positivo.");
        }
    
        Optional<Funcionario> funcionario = funcionarioService.buscarPorId(id);
        
        if (funcionario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário com ID " + id + " não encontrado.");
        }
    
        return ResponseEntity.ok(funcionario.get());
    }
    
    // Endpoint para salvar um novo funcionário
    @PostMapping
    public ResponseEntity<Funcionario> salvar(@RequestBody Funcionario funcionario) {
        Funcionario funcionarioSalvo = funcionarioService.salvar(funcionario);
        return new ResponseEntity<>(funcionarioSalvo, HttpStatus.CREATED);
    }

    // Endpoint para atualizar um funcionário existente
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Funcionario funcionarioAtualizado) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("O ID deve ser um número positivo.");
        }
    
        if (funcionarioAtualizado.getNome() == null || funcionarioAtualizado.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O nome do funcionário é obrigatório.");
        }
    
        if (funcionarioAtualizado.getEmail() == null || funcionarioAtualizado.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O e-mail do funcionário é obrigatório.");
        }
    
        if (funcionarioAtualizado.getCargo() == null || funcionarioAtualizado.getCargo().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O cargo do funcionário é obrigatório.");
        }
    
        Optional<Funcionario> funcionarioExistente = funcionarioService.buscarPorId(id);
        if (funcionarioExistente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário com ID " + id + " não encontrado.");
        }
    
        Funcionario funcionarioAtualizadoSalvo = funcionarioService.atualizar(id, funcionarioAtualizado);
        return ResponseEntity.ok(funcionarioAtualizadoSalvo);
    }

    // Endpoint para excluir um funcionário
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().body("O ID deve ser um número positivo.");
        }
    
        Optional<Funcionario> funcionarioExistente = funcionarioService.buscarPorId(id);
        if (funcionarioExistente.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário com ID " + id + " não encontrado.");
        }
    
        funcionarioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
