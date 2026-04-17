package parcialfinal.example.gestiApar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import parcialfinal.example.gestiApar.model.Usuario;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Usamos List en vez de Optional para evitar que Hibernate genere FETCH FIRST
    @Query("SELECT u FROM Usuario u WHERE u.nombreUsuario = :username")
    List<Usuario> findByNombreUsuario(@Param("username") String nombreUsuario);

    // Usamos COUNT en vez de existsBy para evitar FETCH FIRST
    @Query("SELECT COUNT(u) FROM Usuario u WHERE u.nombreUsuario = :username")
    long countByNombreUsuario(@Param("username") String nombreUsuario);
}
