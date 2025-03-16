package com.exemplo.cadastrofuncionarios.service;

import com.exemplo.cadastrofuncionarios.model.Funcionario;
import com.exemplo.cadastrofuncionarios.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    // Listar todos os funcionários
    public List<Funcionario> listarTodos() {
        return funcionarioRepository.findAll();
    }

    // Buscar funcionário pelo ID
    public Optional<Funcionario> buscarPorId(Long id) {
        return funcionarioRepository.findById(id);
    }

    // Salvar novo funcionário
    public Funcionario salvar(Funcionario funcionario) {
        return funcionarioRepository.save(funcionario);
    }

    // Atualizar funcionário
    public Funcionario atualizar(Long id, Funcionario funcionarioAtualizado) {
        Optional<Funcionario> funcionarioExistente = funcionarioRepository.findById(id);
        if (funcionarioExistente.isPresent()) {
            Funcionario funcionario = funcionarioExistente.get();
            funcionario.setNome(funcionarioAtualizado.getNome());
            funcionario.setEmail(funcionarioAtualizado.getEmail());
            funcionario.setCargo(funcionarioAtualizado.getCargo());
            return funcionarioRepository.save(funcionario);
        }
        return null; // Pode ser tratado com exceção depois
    }

    // Excluir funcionário
    public void excluir(Long id) {
        funcionarioRepository.deleteById(id);
    }
}
