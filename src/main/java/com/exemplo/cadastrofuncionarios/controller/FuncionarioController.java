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
        return new ResponseEntity<>(funcionarios, HttpStatus.OK);
    }

    // Endpoint para buscar um funcionário pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarPorId(@PathVariable Long id) {
        Optional<Funcionario> funcionario = funcionarioService.buscarPorId(id);
        return funcionario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint para salvar um novo funcionário
    @PostMapping
    public ResponseEntity<Funcionario> salvar(@RequestBody Funcionario funcionario) {
        Funcionario funcionarioSalvo = funcionarioService.salvar(funcionario);
        return new ResponseEntity<>(funcionarioSalvo, HttpStatus.CREATED);
    }

    // Endpoint para atualizar um funcionário existente
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizar(@PathVariable Long id, @RequestBody Funcionario funcionarioAtualizado) {
        Funcionario funcionario = funcionarioService.atualizar(id, funcionarioAtualizado);
        return funcionario != null ? new ResponseEntity<>(funcionario, HttpStatus.OK) :
                ResponseEntity.notFound().build();
    }

    // Endpoint para excluir um funcionário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        funcionarioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
