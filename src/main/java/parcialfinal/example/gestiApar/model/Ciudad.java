package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CIUDAD")
public class Ciudad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCIUDAD")
    private Long id;

    @Column(name = "IDDEPARTAMENTO", nullable = false)
    private Long idDepartamento;

    @Column(name = "NOMBRE", nullable = false, length = 100)
    private String nombre;

    public Ciudad() {}
}
